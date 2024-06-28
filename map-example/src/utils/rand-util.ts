import moment from "moment";

const RandUtil = {
    random: function(): number {
        return Math.random()
    },
    randomId: function (range: number = 10000000): string {
        return moment().unix() + '' + Math.floor(Math.random() * range);
    },
}

export default RandUtil