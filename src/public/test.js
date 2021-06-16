const targetPosition = { latitude: 37.619749, longitude: 127.060884 }

const calcDirection = (target, current) => {
    const target_chi = target.latitude * Math.PI / 180;
    const current_chi = current.latitude * Math.PI / 180;
    const target_lambda = target.longitude * Math.PI / 180;
    const current_lambda = current.longitude * Math.PI / 180;
    const y = Math.sin(target_lambda - current_lambda) * Math.cos(target_chi);
    const x = Math.cos(current_chi) * Math.sin(target_chi) - Math.sin(current_chi) * Math.cos(target_chi) * Math.cos(target_lambda - current_lambda);
    const rad_direction = Math.atan2(y, x);
    const bearing = (rad_direction * 180 / Math.PI + 360) % 360;
    return bearing
}


async function ttt() {
    function orientation(event) {
        const beta = event.beta;
        const gamma = event.gamma;
        const alpha = event.alpha;
        const absolute = event.absolute;
        const webkitCompassHeading = event.webkitCompassHeading;
        navigator.geolocation.getCurrentPosition(function (position) {
            const current = { latitude: position.coords.latitude, longitude: position.coords.longitude }
            const kw_direction = calcDirection(targetPosition, current)
            const kw_direction_rs = kw_direction - webkitCompassHeading;
            document.getElementById('log').innerHTML = "alpha:" + alpha + "<br>"
            document.getElementById('log').innerHTML += "beta:" + beta + "<br>"
            document.getElementById('log').innerHTML += "gamma:" + gamma + "<br>"
            document.getElementById('log').innerHTML += "absolute:" + absolute + "<br>"
            document.getElementById('log').innerHTML += "webkitCompassHeading:" + webkitCompassHeading + "<br><br>"
            document.getElementById('log').innerHTML += "latitude:" + current.latitude + "<br>"
            document.getElementById('log').innerHTML += "longitude:" + current.longitude + "<br><br>"
            document.getElementById('log').innerHTML += "KWUNIV_DIRECTION1:" + kw_direction + "<br>"
            document.getElementById('log').innerHTML += "KWUNIV_DIRECTION2:" + kw_direction_rs + "<br>"
        });
    }

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(response => {
            if (response === 'granted') {
                document.getElementById("log").innerHTML += response + "<br>";
                window.addEventListener('deviceorientation', orientation, true);
            } else if (response === 'prompt') {
                document.getElementById("log").innerHTML += "Need prompt!" + "<br>";
            } else {
                document.getElementById("log").innerHTML += response + "<br>";
            }
        }).catch(err => {
            document.getElementById("log").innerHTML += err + "<br>";
        })
    } else {
        window.addEventListener('deviceorientationabsolute', orientation, true);
    }

}

