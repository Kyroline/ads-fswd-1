export const queryBuilder = (baseUrl, queires) => {
    let result = baseUrl
    queires.forEach((val, index) => {
        switch (index) {
            case 0:
                result += `?${val.query}=${val.value}`
                break;

            default:
                result += `&${val.query}=${val.value}`
                break;
        }
    })
    return result
}