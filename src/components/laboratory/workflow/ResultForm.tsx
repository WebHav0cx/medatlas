'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { laboratoryResultSchema } from '@/schemas/workflow-forms';
import { FlaskConical } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";


export function ResultForm({
  requestId,
  onClose,
}: {
  requestId: string
  onClose: () => void
}) {
  const store = useMockData()
  const request = store.state.diagnosticRequests.find(
    (item) => item.id === requestId,
  )
  const {getFieldState,register,handleSubmit,getValues}=useForm<z.infer<typeof laboratoryResultSchema>>({resolver:zodResolver(laboratoryResultSchema),defaultValues:{value:"",unit:"",reference:"",flag:"Normal",comments:""}})
  const save = (data:z.infer<typeof laboratoryResultSchema>, final:boolean) => {
    store.saveLabResult(
      requestId,
      [
        {
          test: request?.tests[0] || "Laboratory Test",
          value: data.value,
          unit: data.unit,
          reference: data.reference,
          flag: data.flag,
        },
      ],
      data.comments,
      final,
    )
    onClose()
  }
  return (
    <div className="fixed inset-0 z-110 grid place-items-center bg-teal-950/42 p-4 backdrop-blur-xs" data-slot="hospital-dialog-backdrop">
      <form
        className="
          max-h-screen w-96 max-w-full overflow-y-auto rounded-2xl border border-mist-200 bg-white p-6
          text-center shadow-xl
        " data-slot="hospital-confirm-dialog workflow-form"
        onSubmit={handleSubmit(data=>save(data,true))}
      >
        <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-700" data-slot="dialog-icon">
          <FlaskConical size={22} />
        </span>
        <h2 className="text-xl leading-normal font-bold tracking-tight text-mist-800 not-italic normal-nums">Enter {request?.tests.join(", ")}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3.5 text-left max-md:grid-cols-1" data-slot="workflow-fields">
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">Result value *</span>
            <input {...register("value")} aria-invalid={getFieldState("value").invalid || undefined} required className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">Unit</span>
            <input {...register("unit")} aria-invalid={getFieldState("unit").invalid || undefined} className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">Reference information</span>
            <input {...register("reference")} aria-invalid={getFieldState("reference").invalid || undefined} className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-olive-600">Flag</span>
            <select {...register("flag")} aria-invalid={getFieldState("flag").invalid || undefined} className="
              h-10 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
              transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            ">
              <option>Normal</option>
              <option>High</option>
              <option>Low</option>
            </select>
          </label>
          <label  data-slot="field-wide" className="col-start-1 col-end-3 flex flex-col gap-1.5 text-left max-md:col-start-1 max-md:col-end-auto">
            <span className="text-xs font-semibold text-olive-600">Laboratory comments</span>
            <textarea {...register("comments")} aria-invalid={getFieldState("comments").invalid || undefined} className="
              min-h-20 w-full resize-y rounded-lg border border-mist-300 bg-white p-3 text-xs leading-normal
              text-mist-800 transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
              focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
              disabled:cursor-not-allowed disabled:opacity-52
            " />
          </label>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="
            min-h-9 rounded-lg border border-mist-200 bg-white px-3 py-0 text-xs font-bold text-emerald-900
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          ">
            Cancel
          </button>
          <button
            type="button"
            onClick={()=>save(getValues(),false)} className="
              min-h-9 rounded-lg border border-mist-200 bg-white px-3 py-0 text-xs font-bold text-emerald-900
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            Save Draft
          </button>
          <button type="submit" className="
            min-h-9 rounded-lg border border-emerald-900 bg-emerald-900 px-3 py-0 text-xs font-bold text-white
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          ">Submit for Review</button>
        </div>
      </form>
    </div>
  )
}
