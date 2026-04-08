

import { connection } from 'next/server'

import { Suspense } from 'react';
import ClientSearch from './client-search';

export default async function SearchPage({
    searchParams,
} : {
    searchParams : { q? : string}
}) {
    await connection();

 
    return (
        <Suspense fallback={<></>}>
            <ClientSearch searchParams={searchParams} />
        </Suspense>
    )

   
}

export const dynamic = 'force-dynamic'