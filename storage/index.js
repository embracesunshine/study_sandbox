const storage = {
    set(key, value, expires) {
        localStorage[key] = JSON.stringify({
            value,
            expires: expires === 'undefined' ? undefined : Date.now() + 1000 * expires
        })
    },
    get(key) {
        if(localStorage[key] === undefined) {
            console.log(`${key}不存在`)
            return 
        }
        const data = JSON.parse(localStorage[key])
        if (!data.expires || Date.now() < data.expires) {
            return data.value
        } else {
            delete localStorage[key]
        }
    }
}