$("input[data-type='currency']").on
({
    keyup: function() {
    formatCurrency($(this));
    },
    blur: function() { 
    formatCurrency($(this), "blur");
    }
});

function formatNumber(n) {
// format number 1000000 to 1,234,567
return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur)
{
    
    // get input value
    var inputValue = input.val();

    // don't validate empty input
    if (inputValue === "") { return; }

    // original length
    var originalLength = inputValue.length;

    // initial caret position 
    var caretPosition = input.prop("selectionStart");
        
    // check for decimal
    if (inputValue.indexOf(".") >= 0) {

        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimalPosition = inputValue.indexOf(".");

        // split number by decimal point
        var left_side = inputValue.substring(0, decimalPosition);
        var right_side = inputValue.substring(decimalPosition);

        // add commas to left side of number
        left_side = formatNumber(left_side);


        // join number by .
        inputValue = left_side ;

    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        inputValue = formatNumber(inputValue);
        inputValue =  inputValue;

    }

    // send updated string to input
    input.val(inputValue);

    // put caret back in the right position
    var updatedLength = inputValue.length;
    caretPosition = updatedLength - originalLength + caretPosition;
    input[0].setSelectionRange(caretPosition, caretPosition);
}


/* -----------------------------------------------------------------------------------

    if you have multiple inputs and want to send values through input type hidden
    you can use below function and set class="hiddenPrice" on each of hidden inputs 
    and also you have to set class="visiblePrice" and data-type="currency" on each of inputs that user can see! 

----------------------------------------------------------------------------------- */

$("input[data-type = 'currency']").on({
    focusout: function()
    {
        var hiddenPrice = document.getElementsByClassName("hiddenPrice");
        var visiblePrice = document.getElementsByClassName("visiblePrice");

    
        for( i = 0 ; i < visiblePrice.length ; i++)
        {

            var numberString = visiblePrice[i].value;
            var numberArray = numberString.split(',');
            var number = numberArray.join('');

            hiddenPrice[i].value = number;
        }
    }
})

    
