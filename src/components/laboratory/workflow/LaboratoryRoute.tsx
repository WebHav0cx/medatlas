'use client';
import { usePathname } from 'next/navigation';
import { LabWorkspace } from './LabWorkspace';
import { AccessDenied } from '@/components/shared/workflow/AccessDenied';
import { useMockData } from '@/stores/workflow/useMockData';
export function LaboratoryRoute(){const path=usePathname(),role=path.split('/')[2];const store=useMockData();const effective=role==='administrator'?'admin':role;if(['reception','scientist','reviewer','admin'].includes(effective)&&(store.currentAccount.role!=='lab-'+effective||store.currentAccount.status!=='Active'))return <AccessDenied/>;if(effective==='reception'||effective==='scientist'||effective==='reviewer'||effective==='admin')return <LabWorkspace role={effective}/>;const current=store.currentAccount.role.replace('lab-','');return <LabWorkspace role={current==='scientist'||current==='reviewer'||current==='admin'?current:'reception'}/>;}
