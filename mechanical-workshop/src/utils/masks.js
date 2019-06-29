class MasksService {

    static formatPhone  (text){
        var x = text.replace(/\D+/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }

    static formatCPF(text){
        var x = text.replace(/\D+/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,1})/);
        return  !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + (x[4] ? '-' + x[4] : '');
    }


}

export default MasksService