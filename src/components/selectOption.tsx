export const SelectOption=()=>{
    
    const options=[
        {label: 'short',value: 2},
        {label: 'medium',value: 5},
        {label: 'long',value: 10}
    ]

    const handleChange=(ev:any)=>{
        console.log(ev.target.value)
    }

    return(
        <div className="select-option">
             <select onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
    )
}