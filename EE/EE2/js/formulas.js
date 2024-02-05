const Formulas = {  
    one_minus_D(D){
        return 1 - D
    },
    step2:{
        v0(values){
            let ans = values.vIn / Formulas.one_minus_D(values.D)
            return Number(ans.toFixed(4))
        },
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        iIn(values){
            let ans = this.i0(values) / Formulas.one_minus_D(values.D)
            return Number(ans.toFixed(4))
        }
    },
    ideal:{
        v0(values){
            let ans = values.vIn / Formulas.one_minus_D(values.D)
            return Number(ans.toFixed(4))
        },
    
        M(values){
            let ans = 1 / Formulas.one_minus_D(values.D)
            return Number(ans.toFixed(4))
        },
        iIn(values){
            let ans = values.vIn / ( Math.pow(Formulas.one_minus_D(values.D),2) * values.R )
            return Number(ans.toFixed(4))
        },
    
        i0(values){
            let ans = values.vIn / (Formulas.one_minus_D(values.D) * values.R)
            return Number(ans.toFixed(4))
        },
    },
    nonIdeal:{
        M(values){
            const rl = 0.2, rs = 0.2, vFD = 0.7, rc = 0.25
            
            let upper = 1 - ((vFD * Formulas.one_minus_D(values.D)) /  values.vIn)
            let bottom = Formulas.one_minus_D(values.D) * (1 + (( rl + rs * values.D) /  (values.R * Math.pow(Formulas.one_minus_D(values.D),2)) ) )
    
            let ans = upper / bottom
            return Number(ans.toFixed(4))
        },
    },
    efficiencyPlot:{
        v0(values){
            let ans = this.M(values) * values.vIn
            return Number(ans.toFixed(4))
        },
        M(values){
            const rl = 0.5, rs = 0.2, vFD = 0.7, rc = 0.25
            
            let upper = 1 - ((vFD * Formulas.one_minus_D(values.D)) /  values.vIn)
            let bottom = Formulas.one_minus_D(values.D) * (1 + (( rl + rs * values.D) /  (values.R * Math.pow(Formulas.one_minus_D(values.D),2)) ) )
    
            let ans = upper / bottom
            return Number(ans.toFixed(4))
        },
        iIn(values){
            let ans = this.i0(values) / Formulas.one_minus_D(values.D)
            return Number(ans.toFixed(4))
        },
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        pIn(values){
            let ans = values.vIn * this.iIn(values)
            return Number(ans.toFixed(4))
        },
    
        p0(values){
            let ans = this.v0(values) * this.i0(values)
            return Number(ans.toFixed(4))
        },
    
        eff(values){
            let ans = (this.p0(values) * 100) / this.pIn(values)
            return Number(ans.toFixed(4))
        }
    },
    stress:{
        v0(values){
            let ans = values.vIn / Formulas.one_minus_D(values.D)
            return Number(ans.toFixed(4))
        },
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        M(values){
            let ans = 1 / Formulas.one_minus_D(values.D)
            return Number(ans.toFixed(4))
        },
        I_In(values){
            let ans = this.M(values) * this.i0(values)
            return Number(ans.toFixed(4))
        },
        i_L2(values){
            let L = 2 * Math.pow(10,-3)
            let fs = 50 * Math.pow(10,3)

            let upper = values.D * values.vIn
            let lower = 2 * L * fs

            let ans = this.I_In(values) + (upper / lower)

            return Number(ans.toFixed(4))
        }
    },
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