import Link from "next/link";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { query } from '.keystone/api'

import { InferGetStaticPropsType } from "next";
import Head from "next/head";


type Product = {
    title: string;
    slug: string;
    id: string;
    content: string;
}

type Service = {
    title: string;
    slug: string;
    id: string;
    content: string;
}

type Solution = {
    title: string;
    slug: string;
    id: string;
    content: string;
}



type Error = {
    slug: string
    content: string
    tag: string
    id: string
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




export default function Custom404({ errors, navs, feet }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>

            <DefaultLayout>

                <>
                    {/* <NavBar2 products={products} services={services} solutions={solutions} /> */}

                    {navs.map(nav => (
                        <div
                            key={nav.id}>
                            <div dangerouslySetInnerHTML={{ __html: nav.content }} />
                        </div>
                    ))}


                    {errors.map(error => (
                        <div
                            key={error.id}
                        >
                            <Head>
                                <meta name='description' content={error.tag} />
                            </Head>
                            <div dangerouslySetInnerHTML={{ __html: error.content }} />
                        </div>

                    ))}


                    {feet.map(foot => (
                        <div
                            key={foot.id}
                        >
                            <div dangerouslySetInnerHTML={{ __html: foot.content }} />
                        </div>
                    ))}


                </>


            </DefaultLayout>


        </>
    );
}





export async function getStaticProps() {
    const errors = await query.Error.findMany({ query: 'id slug content tag' }) as Error[];
    const navs = await query.Nav.findMany({ query: 'id slug content ' }) as Nav[];
    const feet = await query.Foot.findMany({ query: 'id slug content ' }) as Foot[];

    return {
        props: {
            errors,
            navs,
            feet
        }
    };
}