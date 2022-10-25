import React from "react"
import TestimonialForm from "../testimonialForm/TestimonialForm";

const AddTestimonialsPanel = ()=> {

    return (
        <div className="w-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Cuentanos tu experiencia</h2>
            <p>Agrega un tesimonio</p>
            <TestimonialForm/>
        </div>
    );
}

export default AddTestimonialsPanel