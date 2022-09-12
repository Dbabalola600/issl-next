import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { query } from '.keystone/api';
import { Lists } from '.keystone/types';
import DefaultLayout from "../components/layouts/DefaultLayout";
import Head from "next/head";

type Home = {
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

export default function index({ homes, navs, feet }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (

        <DefaultLayout>
            <>

                {navs.map(nav => (
                    <div
                        key={nav.id}>
                        <div dangerouslySetInnerHTML={{ __html: nav.content }} />
                    </div>
                ))}


                {homes.map(home => (
                    <div
                        key={home.id}
                    >
                        <Head>
                            <meta name='description' content={home.tag} />
                        </Head>
                        <div dangerouslySetInnerHTML={{ __html: home.content }} />
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

    )
}



export async function getStaticProps() {



    const homes = await query.Home.findMany({ query: 'id slug content tag' }) as Home[];
    const navs = await query.Nav.findMany({ query: 'id slug content ' }) as Nav[];
    const feet = await query.Foot.findMany({ query: 'id slug content ' }) as Foot[];


    return {
        props: {
            homes,
            navs,
            feet


        }
    }
}


