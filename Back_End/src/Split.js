module.exports = (mes) => {
    if (mes.substring(1, 4) == "REV") {
        const semanas  = mes.substring(6, 10);
        const semana   = parseInt(semanas);
        const dia      = mes.substring(10, 11);
        const dian     = parseInt(dia);
        const hora     = mes.substring(11, 16);
        const horan    = parseInt(hora);
        const semanan  = (semana * 604800 + horan + 315964800 + dian * 86400 - 18000) * 1000;
        const Fecha    = new Date(semanan).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const lat      = mes.substring(17, 19) + "." + mes.substring(19, 24);
        const lng      = mes.substring(24, 25) + mes.substring(26, 28) + "." + mes.substring(28, 33);
        console.log("longitud; ",mes.length);
        const idCar    = mes.substring(mes.length - 6, mes.length);
        const vel      = mes.substring(mes.length - 6, mes.length);
        return {Fecha, lat, lng,  idCar, vel}
    }
}