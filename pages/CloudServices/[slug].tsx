
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { query } from '.keystone/api';
import { Lists } from '.keystone/types';

import DefaultLayout from '../../components/layouts/DefaultLayout';
import Header from '../../components/layouts/Header';


import Head from "next/head";
import { Key } from 'react';

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

type Service={
    id: string;
    title: string;
    content: string;
    slug: string;
    tag: string 
}


type navs = {
    navs: InferGetStaticPropsType<typeof getStaticProps>
}

type feet = {
    feet: InferGetStaticPropsType<typeof getStaticProps>
}


export default function Services({ service, navs, feet,  }: { service: Service,  navs:any, feet:any}) {

    return (
        <DefaultLayout>
            <>


            {navs.map((nav: { id: Key | null | undefined; content: any; }) => (
                    <div
                        key={nav.id}>
                        <div dangerouslySetInnerHTML={{ __html: nav.content }} />
                    </div>
                ))}


            <Head>
                <title> ISSL {service.title} </title>
                <meta  name="description" content={service.tag} />
            </Head>
                {/* <NavBar2 products={products} services={services} solutions={solutions} /> */}



                <div className="md:p-10">
                    <div className="" dangerouslySetInnerHTML={{ __html: service.content }} />
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
    const services = (await query.Service.findMany({
        query: `slug`,
    })) as { slug: string }[];

    const paths = services
        .filter(({ slug }) => !!slug)
        .map(({ slug }) => `/CloudServices/${slug}`);

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
    const service = (await query.Service.findOne({
        where: { slug: params!.slug as string },
        query: 'id title content slug tag',
    })) as Service | null;
    if (!service) {
        return { notFound: true };
    }

    //for the nav bar
    const navs = await query.Nav.findMany({ query: 'id slug content ' }) as Nav[];
    const feet = await query.Foot.findMany({ query: 'id slug content ' }) as Foot[];


    return {
        props: {
          service,
          navs,
            feet
          
        }
    };
}
