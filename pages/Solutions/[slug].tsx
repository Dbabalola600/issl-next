
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { query } from '.keystone/api';
import { Lists } from '.keystone/types';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import Header from '../../components/layouts/Header';

import Head from "next/head";
import { Key } from 'react';


type Solution = {
    id: string;
    title: string;
    content: string;
    slug: string;
    tag: string;
}

type Nav = {
    slug: string
    content: string
   
    id: string
}

type Foot = {

    slug: string
    content: string
   
    id: string
}


type navs = {
    navs: InferGetStaticPropsType<typeof getStaticProps>
}

type feet ={
    feet: InferGetStaticPropsType<typeof getStaticProps>
}

export default function Solutions({ solution, navs, feet }: { solution: Solution, navs: any, feet:any }) {

    return (
        <DefaultLayout>
            <>
                {/* <NavBar2 products={products} services={services} solutions={solutions} /> */}

                {navs.map((nav: { id: Key | null | undefined; content: any; }) => (
                    <div
                        key={nav.id}>
                        <div dangerouslySetInnerHTML={{ __html: nav.content }} />
                    </div>
                ))}

                <Head>
                    <meta name='description' content={solution.tag} />
                    <title> ISSL {solution.title} </title>
                </Head>

                <div className="md:p-10">
                    <div className="" dangerouslySetInnerHTML={{ __html: solution.content }} />
                </div>


                {feet.map((foot: { id: Key | null | undefined; content: any; }) => (
                    <div
                        key={foot.id}
                    >
                        <div dangerouslySetInnerHTML={{ __html: foot.content }} />
                    </div>
                ))}



            </>

        </DefaultLayout>
    )
}


export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const solutions = (await query.Solution.findMany({
        query: `slug`,
    })) as { slug: string }[];

    const paths = solutions
        .filter(({ slug }) => !!slug)
        .map(({ slug }) => `/Solutions/${slug}`);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const solution = (await query.Solution.findOne({
        where: { slug: params!.slug as string },
        query: 'id title content slug tag',
    })) as Solution | null;
    if (!solution) {
        return { notFound: true };
    }

    //for navbar
    const navs = await query.Nav.findMany({ query: 'id slug content ' }) as Nav[];
    const feet = await query.Foot.findMany({ query: 'id slug content ' }) as Foot[];

    return {
        props: {
            solution,
            navs,
            feet

        }
    };
}
