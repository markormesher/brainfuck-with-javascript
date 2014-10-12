var confirmMessage = "Replace current contents?";

$(document).ready(function() {
   
    $('.example-1').click(function(e) {
        if (editor.val() == "" || confirm(confirmMessage)) {
            editor.val('++++++[>++++++++++<-]>+++++.');
        }
    });
    
    $('.example-2').click(function(e) {
        if (editor.val() == "" || confirm(confirmMessage)) {
            editor.val('++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>-[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.');
        }
    });
    
    $('.example-3').click(function(e) {
        if (editor.val() == "" || confirm(confirmMessage)) {
            editor.val('>++++++++[<+++++++++>-]<.>>+>+>++>[-]+<[>[->+<<++++>]<<]>.+++++++..+++.>>+++++++.<<<[[-]<[-]>]<+++++++++++++++.>>.+++.------.--------.>>+.>++++.');
        }
    });
    
});