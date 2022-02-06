import {useFormik} from "formik"
import { cardsAPI } from "../../../dal/api"

type FormikValuesType = {
    email: string
}

export const PassRecoverPage = () => {

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: async (data: FormikValuesType) => {
            alert(JSON.stringify(data))
            let res = await cardsAPI.recover(data.email)
            console.log(res)
        }
    })

    return (
        <div>
            <div>
                <span>Forgot your paassword?</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                email
                <input name={'email'} onChange={formik.handleChange} value={formik.values.email}/>

                <span>
                    Enter your email address and we will send you further instructions
                </span>

                <button type={'submit'}>Submit</button>
            </form>
            <div>
                <button>Back to login</button>
            </div>
        </div>
    )
}