const data = {
    isDuringDate: function (beginDateStr, edfDateStr) {
        let curDate = new Date(), beginDate = new Date(beginDateStr), endDate = new Date(edfDateStr);
        if (curDate >= beginDate && curDate <= endDate) {
            return true;
        }
        return false;
    }
}

export function judgeDate(e) {
    return data.isDuringDate("2020/11/01",e)
}