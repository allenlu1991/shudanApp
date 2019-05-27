import fetch from './request'

import {
  API_FORMID,
} from '@constants/api'

export default function formSubmitHandle(e) {
    let formId = e.detail.formId

    let payload = {
        formId,
    }

    fetch({
        url: API_FORMID, 
        payload, 
        method: 'POST',
    }).then(res => {
        console.log(res)
    })
}