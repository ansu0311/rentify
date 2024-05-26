type Props ={
  label?:string,
  placeholder:string,
  onChange:any,
  type?:string,
}

export function InputBox({label, placeholder,onChange,type}:Props) {

    return <div>
      <input placeholder={placeholder} onChange={onChange} id={label} type={type}
      className="w-full px-5 py-3 text-2xl border rounded-full text-white border-none my-2
       bg-teal-900 placeholder-teal-300 font-semibold" />
    </div>
}

type Props2 ={
  label?:string,
  placeholder:string,
  onChange:any,
  type:string,
  editable:any,
  value:any
}
export function InputBoxProfile({label,type, placeholder,onChange,editable, value}:Props2) {

  return <div className="flex items-center justify-between">
    <div className="text-xl font-bold mr-2">{label}{" : "}</div>
    <input id={label} placeholder={placeholder} onChange={onChange} type={type} contentEditable={editable} value={value}
    className="w-2/3 px-4 py-1 text-xl border rounded-full text-teal-300 border-none my-1 bg-teal-900 placeholder-white/35 font-semibold" />
  </div>
}