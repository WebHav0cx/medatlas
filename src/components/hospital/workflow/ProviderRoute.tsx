'use client';
import { usePathname } from 'next/navigation';
import { RoleWorkspace } from './RoleWorkspace';
import { useMockData } from '@/stores/workflow/useMockData';
import { AccessDenied } from '@/components/shared/workflow/AccessDenied';
import { ProviderWorkspace } from '../provider/ProviderWorkspace';
export function ProviderRoute(){const path=usePathname(),role=path.split('/')[2];const store=useMockData();if(['doctor','nurse','records','admin'].includes(role)&&(store.currentAccount.role!==role||store.currentAccount.status!=='Active'))return <AccessDenied/>;if(role==='doctor'||role==='nurse'||role==='records'||role==='admin')return <RoleWorkspace role={role}/>;return <ProviderWorkspace/>;}
