const Formulas = {  
    one_minus_D(D){
        return 1 - D
    },
    v0(values){
        let ans = values.vIn / this.one_minus_D(values.D)
        return ans.toFixed(2)
    },

    M_1(values){
        let ans = 1 / this.one_minus_D(values.D)
        return ans.toFixed(2)
    },

    M_2(values){
        const rl = 0.2, rs = 0.2, vFD = 0.7, rc = 0.25
        
        let upper = 1 - ((vFD * this.one_minus_D(values.D)) /  values.vIn)
        let bottom = this.one_minus_D(values.D) * (1 + (( rl + rs * values.D) /  (values.R * Math.pow(this.one_minus_D(values.D),2)) ) )

        let ans = upper / bottom
        return ans.toFixed(2)
    },

    iIn(values){
        let ans = values.vIn / ( Math.pow(this.one_minus_D(values.D),2) * values.R )
        return ans.toFixed(2)
    },

    i0(values){
        let ans = values.vIn / (this.one_minus_D(values.D) * values.R)
        return ans.toFixed(2)
    },

    pIn(values){
        let ans = values.vIn / (this.one_minus_D(values.D) * values.R)
        return ans.toFixed(2)
    },

    p0(values){
        let ans = values.vIn / (this.one_minus_D(values.D) * values.R)
        return ans.toFixed(2)
    },

    eff(values){
        let ans = values.vIn / (this.one_minus_D(values.D) * values.R)
        return ans.toFixed(2)
    }
}


let values = {
    vIn:0,
    D:0,
    R:0,
}

function updateValues(vIn,D,R){
    values = {
        vIn:vIn,
        D:D,
        R:R,
    }
}