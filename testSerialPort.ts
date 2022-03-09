import SerialPort from 'serialport'
import SACPBusiness from './SACP/business/Business'
import CoordinateSystemInfo from './SACP/business/models/CoordinateSystemInfo'

(async function() {
    // console.log(SerialPort)
    const ports = await SerialPort.list()
    console.log(ports)
    // return;
    if (ports && ports.length) {
        const sp = new SerialPort(ports[0].path, { autoOpen: false, baudRate: 115200 })
        // console.log(sp)
        const b = new SACPBusiness('serialport', sp);
        sp.on('data', (data) => {
            console.log('from sp', data)
            b.read(data)
            // b.communication.receive(data)
        })
        sp.open();

        // b.subscribeHeartbeat({ interval: 1000 }, (res) => {
        //     console.log(res)
        // })

        // function cb(p: HandlerResponse) {
        //     console.log(
        //         new Date(),
        //         'receive heartbeat from ', p.packet.header.senderId,
        //         '\nresult is ', p.response.result,
        //         '\nsystem state ', p.response.data
        //     )
        // }

        // b.subHeartbeat({
        //     interval: 1000
        // }, cb)
        // setTimeout(() => {
        //     b.unsubscribe(0x01, 0xa0, cb).then(() => {
        //         console.log('unsubscribed heartbeat')
        //     })
        // }, 5000);
        
        // b.send(0x01, 0x21, Buffer.alloc(0)).then(console.log)
        b.getCurrentCoordinateInfo().then(res => {
            console.log(2222, res)
        })
        // b.send(0xac, 0x03, ) // 开始打印
    }

    // new CoordinateSystemInfo().fromBuffer(Buffer.from([0x00, 0x01, 0x00, 0x01, 0x04, 0x00, 0xe0, 0xb1, 0xff, 0xff, 0x06, 0xc8, 0x14, 0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x02, 0x04, 0x38, 0x03, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00]))
})()