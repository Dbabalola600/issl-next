
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { query } from '.keystone/api';
import { Lists } from '.keystone/types';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import Header from '../../components/layouts/Header';


import Head from "next/head";
import { Key } from 'react';



type Technology = {
    id: string;
    title: string;
    content: string;
    slug: string;
    tag: string
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

type feet = {
    feet: InferGetStaticPropsType<typeof getStaticProps>
}

export default function Products({ technology, navs, feet }: { technology: Technology, navs: any, feet: any, }) {

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
                    <title> ISSL {technology.title}  </title>
                    <meta name="description" content={technology.tag} />
                </Head>
                <div className="md:p-10">
                    <div className="" dangerouslySetInnerHTML={{ __html: technology.content }} />
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
    const technologies = (await query.Technology.findMany({

        query: `slug`,
    })) as { slug: string }[];

    const paths = technologies
        .filter(({ slug }) => !!slug)
        .map(({ slug }) => `/Technologies/${slug}`);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const technology = (await query.Technology.findOne({
        where: { slug: params!.slug as string },
        query: 'id title content slug tag',
    })) as Technology | null;
    if (!technology) {
        return { notFound: true };
    }

    //for navbar
    const navs = await query.Nav.findMany({ query: 'id slug content ' }) as Nav[];
    const feet = await query.Foot.findMany({ query: 'id slug content ' }) as Foot[];

    return {
        props: {
            technology,
            navs,
            feet
        }
    };
}
