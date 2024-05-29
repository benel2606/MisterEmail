import { useEffect, useRef, useState } from "react"
import { emailService } from "../services/email.service"


export function EmailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const formRef = useRef()
    // console.log('formRef:', formRef)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    
    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // function handleModelChange({ target }) {
    //     const value = target.value
    //     setFilterBy(prevFilter => ({ ...prevFilter, model: value }))
    // }

    // function handleMinBatteryChange({ target }) {
    //     const value = target.value
    //     setFilterBy(prevFilter => ({ ...prevFilter, minBatteryStatus: +value }))
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { model, minBatteryStatus } = filterByToEdit
    return (
        <form ref={formRef} onSubmit={onSubmitFilter} className="email-filter">
            <section>
                <label htmlFor="model">Model</label>
                <input onChange={handleChange} name="model" id="model" type="text" value={model} />
            </section>
            <section>
                <label htmlFor="minBatteryStatus">MinBatteryStatus</label>
                <input onChange={handleChange} name="minBatteryStatus" id="minBatteryStatus" type="number" value={minBatteryStatus} />
            </section>
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}   