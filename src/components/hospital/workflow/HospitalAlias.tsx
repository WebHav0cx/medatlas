'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
export function HospitalAlias(){const path=usePathname(),router=useRouter();const destination=path.replace('/hospital/','/provider/').replace('/administrator/','/admin/');useEffect(()=>router.replace(destination),[destination,router]);return null;}
