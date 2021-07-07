import request from '../api/index';

const loginSvs = {
    Login: (data) => {
        return request({
            url: `/guotou-auth/oauth/token`,
            data:data,
            method: 'POST',
            headers: {
                contentType: 'formType'
            },
        })
    },
}
export default loginSvs