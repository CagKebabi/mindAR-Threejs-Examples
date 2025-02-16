/* BÖLÜM 2 QUICK START */
// const THREE = window.MINDAR.IMAGE.THREE;
import * as THREE from 'three';
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';


console.log(THREE);


document.addEventListener('DOMContentLoaded', () => {
    const start = async () => { 
        try {
            // Kamera API'sinin varlığını kontrol et
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Tarayıcınız kamera erişimini desteklemiyor. Lütfen modern bir tarayıcı kullanın (Chrome, Firefox, Safari gibi)');
            }

            // HTTPS kontrolü - yerel ağ için özel durum
            const isLocalNetwork = /^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^localhost$|^127\.0\.0\.1$/.test(location.hostname);
            if (location.protocol !== 'https:' && !isLocalNetwork) {
                throw new Error('Kamera erişimi için HTTPS gereklidir. Lütfen sayfayı HTTPS üzerinden açın.');
            }

            // Kamera erişimi iste
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());

            const mindarThree = new MindARThree({
                container: document.body,
                imageTargetSrc: './assets/targets/targets.mind'
            });
    
            const { renderer, scene, camera } = mindarThree;
    
            const geometry = new THREE.PlaneGeometry(1,1);
    
            const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
    
            const plane = new THREE.Mesh(geometry, material);
    
            const anchor = mindarThree.addAnchor(0);
            anchor.group.add(plane);
    
            await mindarThree.start();
    
            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
            });
        } catch (error) {
            console.error('AR deneyimi başlatılırken hata:', error);
            
            // Kullanıcıya daha anlaşılır hata mesajları göster
            let errorMessage = error.message;
            if (error.name === 'NotReadableError') {
                errorMessage = 'Kamera erişimi hatası! Lütfen şunları kontrol edin:\n' +
                             '1. Başka bir uygulama kamerayı kullanmıyor olmalı\n' +
                             '2. Kamera düzgün bağlı ve çalışıyor olmalı\n' +
                             '3. Tarayıcının kamera erişim izni olmalı';
            }
            
            alert(errorMessage);
        }
    }
    start();
})