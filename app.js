$('input').each(function() {
    this.addEventListener('click', btnClick)
})

let upper = $('#upper')
let lower = $('#lower')

let zeroIsDisplayed = true;
let lowerDisplayLength = 0;
let numberOfDecimals = 0;
let topNumberExists = false
let bottomNumberExists = false;
let tmp;
let operator;
let reset = false;

function btnClick(e) {
    let val = e.target.value

    if(isDigit(val) || val === '0') {
        if(lowerDisplayLength < 11) {
            if(zeroIsDisplayed) {
                lower.empty()
                zeroIsDisplayed = false
            }
            if(reset) {
                lower.empty()
                reset = false;
            }
            lower.append(val)
            lowerDisplayLength++
            bottomNumberExists = true;
        }       
    }

    if(isOperator(val)) {
        if(!topNumberExists) {
            operator = val
            upper.append(lower.text() + ' ' + val)
            lower.empty()
            topNumberExists = true;
            bottomNumberExists = false;
            lowerDisplayLength = 0
        }
        else {
            if(!bottomNumberExists) {
                lower.append(val)
            } 
            else {
                operator = val
                tmp = (eval(upper.text() + lower.text())).toString()
                upper.empty()
                upper.append(tmp + ' ' + val)
                lower.empty()
                bottomNumberExists = false
                lowerDisplayLength = 0
            }
        }
    }

    if(val === '=') {
        if(lower.text() === '2471') {
            document.body.style.backgroundImage = "url(img/Hearty-Yeast-Free-Bread-WS-Thumbnail.jpg)";
            alert('CHLEBS!')
        } else {
            tmp = eval(upper.text() + lower.text())
            lower.empty()
            upper.empty()
            lower.append(tmp)
            reset = true
        }
        
    }

    if(val === 'AC') {
        clear()
        lower.append('0')
        lowerDisplayLength = 0
        zeroIsDisplayed = true
    }

    if(val === '.') {
        if(numberOfDecimals === 0) {
            lower.append(val)
            zeroIsDisplayed = false
        }
    }
}

function isDigit(val) {
    return Number.isInteger(parseInt(val))
}

function isOperator(val) {
    return (val === '+' ||
            val === '-' ||
            val === '*' ||
            val === '/' )
}

function clear() {
    lower.empty()
    upper.empty()
}