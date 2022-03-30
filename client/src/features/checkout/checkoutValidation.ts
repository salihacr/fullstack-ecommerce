import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        fullName: yup.string().required('Fullname is required').min(3, "Minimum 3 characters"),
        address1: yup.string().required('Address line 1 is required'),
        address2: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        country: yup.string().required(),
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required(),
    })
]