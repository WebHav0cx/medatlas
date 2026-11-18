import type { MockState } from '../../domain/workflow/types.ts';

// Original fictional fixtures supplied by the user. IDs, dates and visible values are retained.
export const initialMockState: MockState = {
  currentAccountId: 'staff-doctor', currentPatientAccountId: 'patient-account-1',
  patients: [
    {id:'patient-1',medAtlasId:'MA-002841',firstName:'Aremu',lastName:'Adewale',dob:'1986-05-14',sex:'Male',phone:'08000004821',localId:'CH-29384',verification:'Verified',assignedStaff:['staff-doctor','staff-nurse'],sourceFacilities:['CityCare Hospital','Mercy Specialist Hospital']},
    {id:'patient-2',medAtlasId:'MA-003109',firstName:'Bola',lastName:'James',dob:'1992-08-03',sex:'Female',phone:'08000007318',localId:'CH-29391',verification:'Verified',assignedStaff:['staff-doctor','staff-nurse'],sourceFacilities:['CityCare Hospital','Prime Diagnostics']},
    {id:'patient-3',medAtlasId:'MA-004721',firstName:'Kemi',lastName:'Bello',dob:'1979-11-22',sex:'Female',phone:'08000009214',localId:'CH-29401',verification:'Verified',assignedStaff:['staff-doctor','staff-nurse'],sourceFacilities:['CityCare Hospital','Lagoon Clinic']},
    {id:'patient-4',medAtlasId:'MA-009331',firstName:'Adewale',lastName:'Aremu',dob:'1986-05-14',sex:'Male',phone:'08000004821',localId:'MSH-11482',verification:'Pending',assignedStaff:[],sourceFacilities:['Mercy Specialist Hospital']},
    {id:'patient-5',medAtlasId:'MA-006820',firstName:'Ifeoma',lastName:'Nwankwo',dob:'1990-02-17',sex:'Female',phone:'08000006124',localId:'CH-29412',verification:'Verified',assignedStaff:['staff-doctor'],sourceFacilities:['CityCare Hospital']},
  ],
  encounters:[
    {id:'ENC-2026-1048',patientId:'patient-1',type:'Outpatient',facility:'CityCare Hospital',date:'2026-10-23',recordCategories:['Consultation Summary']},
    {id:'ENC-2026-0881',patientId:'patient-1',type:'Inpatient',facility:'Mercy Specialist Hospital',date:'2026-03-14',recordCategories:['Discharge Summary','Medication History']},
    {id:'ENC-2026-1041',patientId:'patient-2',type:'Diagnostic',facility:'Prime Diagnostics',date:'2026-10-22',recordCategories:['Laboratory Results']},
  ],
  documents:[
    {id:'doc-1',patientId:'patient-1',title:'Discharge Summary',category:'Discharge Summary',sourceFacility:'Mercy Specialist Hospital',date:'2026-03-14',access:'Approved',patientAccess:'Available',author:'Dr. A. Yusuf',eventId:'ENC-2026-0881',requestId:'REQ-008472'},
    {id:'doc-2',patientId:'patient-2',title:'Laboratory Results',category:'Laboratory Results',sourceFacility:'Prime Diagnostics',date:'2026-10-22',access:'Approved',patientAccess:'Available',author:'Dr. E. Nwosu',eventId:'ENC-2026-1041'},
    {id:'doc-3',patientId:'patient-3',title:'Consultation Summary',category:'Consultation Summary',sourceFacility:'Lagoon Clinic',date:'2026-10-21',access:'Limited',patientAccess:'Restricted',author:'Lagoon Clinic Records Team'},
    {id:'doc-4',patientId:'patient-1',title:'Consultation Summary',category:'Consultation Summary',sourceFacility:'CityCare Hospital',date:'2026-10-23',access:'Approved',patientAccess:'Available',author:'Dr. T. Okafor',eventId:'ENC-2026-1048'},
    {id:'doc-5',patientId:'patient-5',title:'Immunisation Record',category:'Immunisation Record',sourceFacility:'CityCare Hospital',date:'2026-06-09',access:'Approved',patientAccess:'Available',author:'CityCare Immunisation Clinic'},
  ],
  requests:[
    {id:'REQ-008472',patientId:'patient-1',requester:'CityCare Hospital',sourceFacility:'Mercy Specialist Hospital',category:'Discharge Summary',purpose:'Continuity of Care',authorisation:'Verified clinical relationship',priority:'Routine',status:'Fulfilled',createdAt:'23 Oct · 10:42',history:[{status:'Submitted',at:'23 Oct · 10:42',actor:'Dr. T. Okafor'},{status:'Under Review',at:'23 Oct · 10:58',actor:'C. Adeyemi'},{status:'Approved',at:'23 Oct · 11:18',actor:'C. Adeyemi'},{status:'Fulfilled',at:'23 Oct · 11:24',actor:'Exchange service'}]},
    {id:'REQ-008481',patientId:'patient-3',requester:'Lagoon Clinic',sourceFacility:'CityCare Hospital',category:'Consultation Summary',purpose:'Referral',authorisation:'Patient authorisation required',priority:'Routine',status:'Under Review',createdAt:'23 Oct · 09:12',history:[{status:'Submitted',at:'23 Oct · 09:12',actor:'Lagoon Clinic'}]},
  ],
  referrals:[{id:'REF-00412',patientId:'patient-2',destination:'Prime Diagnostics',reason:'Diagnostic review',context:'Review available encounter information before appointment.',attachments:['Consultation Summary'],status:'Acknowledged',createdAt:'22 Oct · 14:20'}],
  identityCases:[{id:'IDR-00219',patientAId:'patient-1',patientBId:'patient-4',reasons:['Reversed first and last names','Same date of birth','Matching phone ending'],matchingEvidence:['Date of birth: 14 May 1986','Phone ending: 4821','Sex: Male'],conflictingEvidence:['Name order differs','Different local identifiers','Different source facilities'],documents:['CityCare registration form','Mercy encounter face sheet'],status:'Pending Review',notes:[],decisions:[]}],
  staff:[
    {id:'staff-doctor',name:'Dr. T. Okafor',role:'doctor',title:'Doctor / Clinician',department:'Internal Medicine',email:'t.okafor@citycare.example',status:'Active',lastActive:'Now'},
    {id:'staff-nurse',name:'Nurse A. Bello',role:'nurse',title:'Nurse',department:'Medical Ward',email:'a.bello@citycare.example',status:'Active',lastActive:'12 min ago'},
    {id:'staff-records',name:'C. Adeyemi',role:'records',title:'Medical Records Officer',department:'Health Records',email:'c.adeyemi@citycare.example',status:'Active',lastActive:'18 min ago'},
    {id:'staff-admin',name:'F. Musa',role:'admin',title:'Hospital Administrator',department:'Administration',email:'f.musa@citycare.example',status:'Active',lastActive:'35 min ago'},
    {id:'staff-lab-reception',name:'R. Okeke',role:'lab-reception',title:'Laboratory Reception Officer',department:'Reception',email:'r.okeke@prime.example',status:'Active',lastActive:'Now'},
    {id:'staff-lab-scientist',name:'L. Ibrahim',role:'lab-scientist',title:'Laboratory Scientist',department:'Haematology',email:'l.ibrahim@prime.example',status:'Active',lastActive:'8 min ago'},
    {id:'staff-lab-reviewer',name:'Dr. E. Nwosu',role:'lab-reviewer',title:'Authorised Result Reviewer',department:'Clinical Pathology',email:'e.nwosu@prime.example',status:'Active',lastActive:'16 min ago'},
    {id:'staff-lab-admin',name:'M. Danjuma',role:'lab-admin',title:'Laboratory Administrator',department:'Administration',email:'m.danjuma@prime.example',status:'Active',lastActive:'25 min ago'},
  ],
  tasks:[
    {id:'task-1',patientId:'patient-1',title:'Confirm external document availability',assignedTo:'staff-nurse',assignedBy:'Dr. T. Okafor',due:'11:30 AM',priority:'Routine',status:'Assigned'},
    {id:'task-2',patientId:'patient-2',title:'Coordinate diagnostic handover',assignedTo:'staff-nurse',assignedBy:'Dr. T. Okafor',due:'12:00 PM',priority:'Routine',status:'Pending'},
    {id:'task-3',patientId:'patient-3',title:'Follow up referral acknowledgement',assignedTo:'staff-nurse',assignedBy:'Dr. T. Okafor',due:'Today',priority:'High',status:'Escalated'},
  ],
  audit:[
    {id:'audit-1',at:'23 Oct · 11:31',actor:'Dr. T. Okafor',role:'Clinician',action:'Document accessed',resource:'doc-1',outcome:'Success',detail:'Opened authorised discharge summary.'},
    {id:'audit-2',at:'23 Oct · 11:18',actor:'C. Adeyemi',role:'Medical Records Officer',action:'Record release approved',resource:'REQ-008472',outcome:'Success',detail:'Approved source document for release.'},
  ],
  organisations:[{id:'org-citycare',name:'CityCare Hospital',type:'Hospital',location:'Ikeja, Lagos',status:'Active'},{id:'org-prime',name:'Prime Diagnostics',type:'Laboratory / Diagnostic Centre',location:'Victoria Island, Lagos',status:'Active'},{id:'org-mercy',name:'Mercy Specialist Hospital',type:'Hospital',location:'Ikeja, Lagos',status:'Active'},{id:'org-lagoon',name:'Lagoon Clinic',type:'Clinic',location:'Surulere, Lagos',status:'Active'}],
  diagnosticRequests:[
    {id:'DXR-004281',patientId:'patient-2',requestingFacility:'CityCare Hospital',destination:'Prime Diagnostics',requestingClinician:'Dr. T. Okafor',tests:['Full Blood Count'],priority:'Routine',purpose:'Diagnostic follow-up',submittedAt:'23 Oct · 09:18',status:'Awaiting Review',assignedScientistId:'staff-lab-scientist',history:[{status:'Submitted',at:'23 Oct · 09:18',actor:'Dr. T. Okafor'},{status:'Acknowledged',at:'23 Oct · 09:32',actor:'R. Okeke'},{status:'Assigned',at:'23 Oct · 09:40',actor:'R. Okeke'},{status:'Specimen Collected',at:'23 Oct · 10:06',actor:'R. Okeke'},{status:'Processing',at:'23 Oct · 10:20',actor:'L. Ibrahim'},{status:'Awaiting Review',at:'23 Oct · 11:10',actor:'L. Ibrahim'}]},
    {id:'DXR-004288',patientId:'patient-1',requestingFacility:'CityCare Hospital',destination:'Prime Diagnostics',requestingClinician:'Dr. T. Okafor',tests:['Lipid Profile'],priority:'Urgent',purpose:'Continuity of Care',submittedAt:'23 Oct · 11:02',status:'Submitted',history:[{status:'Submitted',at:'23 Oct · 11:02',actor:'Dr. T. Okafor'}]},
  ],
  specimens:[{id:'SPC-10281',requestId:'DXR-004281',patientId:'patient-2',sampleType:'EDTA whole blood',collectedAt:'23 Oct · 10:06',collector:'R. Okeke',status:'Processing Completed',assignedTo:'staff-lab-scientist'}],
  labResults:[{id:'LAB-007812',requestId:'DXR-004281',patientId:'patient-2',values:[{test:'Haemoglobin',value:'13.4',unit:'g/dL',reference:'12.0–16.0',flag:'Normal'},{test:'White Cell Count',value:'7.2',unit:'×10⁹/L',reference:'4.0–11.0',flag:'Normal'}],comments:'Values reviewed against the stated laboratory reference information.',reportTitle:'Full Blood Count Report',status:'Submitted for Review',scientistId:'staff-lab-scientist',updatedAt:'23 Oct · 11:10'}],
  exchanges:[], invitations:[{code:'PRIME-LAB-2026',organisationId:'org-prime',email:'newscientist@example.test',role:'lab-scientist',department:'Haematology',status:'Pending'}],organisationApplications:[],
  patientAccounts:[
    {id:'patient-account-1',patientId:'patient-1',fullName:'Aremu Adewale',email:'patient@example.test',phone:'08000004821',dob:'1986-05-14',password:'medatlas',status:'Active',createdAt:'12 Mar 2026',preferences:{email:true,sms:true,sharing:true,records:true}},
    {id:'patient-account-2',patientId:'patient-2',fullName:'Bola James',email:'bola.patient@example.test',phone:'08000007318',dob:'1992-08-03',password:'medatlas',status:'Active',createdAt:'21 Oct 2026',preferences:{email:true,sms:false,sharing:true,records:true}},
    {id:'patient-account-3',patientId:'patient-3',fullName:'Kemi Bello',email:'kemi.patient@example.test',phone:'08000009214',dob:'1979-11-22',password:'medatlas',status:'Active',createdAt:'19 Oct 2026',preferences:{email:true,sms:true,sharing:true,records:true}},
    {id:'patient-account-4',patientId:'patient-5',fullName:'Ifeoma Nwankwo',email:'ifeoma.patient@example.test',phone:'08000006124',dob:'1990-02-17',password:'medatlas',status:'Active',createdAt:'08 Jun 2026',preferences:{email:true,sms:false,sharing:true,records:true}},
  ],
  patientLinks:[
    {id:'PLINK-001',accountId:'patient-account-1',patientId:'patient-1',facility:'CityCare Hospital',method:'Linking Code',status:'Linked',submittedAt:'12 Mar 2026',updatedAt:'12 Mar 2026',note:'Facility-issued code verified and approved.'},
    {id:'PLINK-002',accountId:'patient-account-1',patientId:'patient-1',facility:'Mercy Specialist Hospital',method:'Review Request',status:'Linked',submittedAt:'12 Mar 2026',updatedAt:'14 Mar 2026',note:'Approved after facility review.'},
    {id:'PLINK-003',accountId:'patient-account-1',patientId:'patient-1',facility:'Prime Diagnostics',method:'Facility Invitation',status:'Linked',submittedAt:'07 Sep 2026',updatedAt:'07 Sep 2026',note:'Laboratory invitation accepted.'},
    {id:'PLINK-004',accountId:'patient-account-2',patientId:'patient-2',facility:'CityCare Hospital',method:'Review Request',status:'Pending Verification',submittedAt:'22 Oct 2026',updatedAt:'22 Oct 2026',note:'Awaiting records officer review.'},
    {id:'PLINK-005',accountId:'patient-account-3',patientId:'patient-3',facility:'CityCare Hospital',method:'Facility Invitation',status:'Linked',submittedAt:'19 Oct 2026',updatedAt:'19 Oct 2026',note:'Facility invitation accepted.'},
    {id:'PLINK-006',accountId:'patient-account-4',patientId:'patient-5',facility:'CityCare Hospital',method:'Linking Code',status:'Linked',submittedAt:'08 Jun 2026',updatedAt:'08 Jun 2026',note:'Facility-issued code verified and approved.'},
  ],
  sharingPermissions:[
    {id:'SHARE-001',accountId:'patient-account-1',patientId:'patient-1',requestId:'REQ-008472',requestingOrganisation:'CityCare Hospital',requestingProfessional:'Dr. T. Okafor',sourceFacility:'Mercy Specialist Hospital',recordCategory:'Discharge Summary',purpose:'Continuity of Care',scope:'This specific discharge summary',duration:'Until this request is fulfilled',status:'Active',createdAt:'23 Oct · 10:42',decidedAt:'23 Oct · 11:02'},
    {id:'SHARE-002',accountId:'patient-account-3',patientId:'patient-3',requestId:'REQ-008481',requestingOrganisation:'Lagoon Clinic',requestingProfessional:'Dr. A. Balogun',sourceFacility:'CityCare Hospital',recordCategory:'Consultation Summary',purpose:'Referral',scope:'Consultation summary only',duration:'30 days after approval',status:'Pending Decision',createdAt:'23 Oct · 09:12'},
  ],
  patientRequests:[{id:'PRQ-00124',accountId:'patient-account-1',patientId:'patient-1',type:'Copy of Record',facility:'Mercy Specialist Hospital',documentId:'doc-1',note:'Personal copy requested.',status:'Completed',submittedAt:'20 Oct · 14:18',updatedAt:'22 Oct · 09:44',history:[{status:'Submitted',at:'20 Oct · 14:18',actor:'Aremu Adewale',note:'Personal copy requested.'},{status:'Completed',at:'22 Oct · 09:44',actor:'C. Adeyemi',note:'Released copy is available in My Health Records.'}]}],
  patientNotifications:[
    {id:'PNOT-001',accountId:'patient-account-1',type:'Record Available',title:'Consultation summary available',message:'CityCare Hospital released a consultation summary.',at:'23 Oct · 11:36',read:false,href:'/patient/records/doc-4',relatedId:'doc-4'},
    {id:'PNOT-002',accountId:'patient-account-1',type:'Request Update',title:'Record copy request completed',message:'Your requested copy is now available.',at:'22 Oct · 09:44',read:true,href:'/patient/requests/PRQ-00124',relatedId:'PRQ-00124'},
    {id:'PNOT-003',accountId:'patient-account-3',type:'Sharing Request',title:'Sharing decision needed',message:'Lagoon Clinic requested your consultation summary.',at:'23 Oct · 09:12',read:false,href:'/patient/sharing',relatedId:'SHARE-002'},
  ],
  facility:{name:'CityCare Hospital',type:'Hospital',address:'12 Adeola Avenue, Ikeja, Lagos',phone:'+234 800 000 0000',email:'operations@citycare.example',departments:['Internal Medicine','Medical Ward','Health Records','Administration']},
};
export const createInitialMockState = (): MockState => structuredClone(initialMockState);
