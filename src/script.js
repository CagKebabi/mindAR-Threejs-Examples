// import * as THREE from 'three';
// import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// // Asset importları
// import targetMind from './assets/targets/targets.mind?url';
// import modelGlb from './assets/models/model(2).glb?url';

// console.log(THREE);

// document.addEventListener('DOMContentLoaded', () => {
//     const start = async () => { 
//         try {
//             // Kamera API'sinin varlığını kontrol et
//             if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//                 throw new Error('Tarayıcınız kamera erişimini desteklemiyor. Lütfen modern bir tarayıcı kullanın (Chrome, Firefox, Safari gibi)');
//             }

//             // HTTPS kontrolü - yerel ağ için özel durum
//             const isLocalNetwork = /^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^localhost$|^127\.0\.0\.1$/.test(location.hostname);
//             if (location.protocol !== 'https:' && !isLocalNetwork) {
//                 throw new Error('Kamera erişimi için HTTPS gereklidir. Lütfen sayfayı HTTPS üzerinden açın.');
//             }

//             // Kamera erişimi iste
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             stream.getTracks().forEach(track => track.stop());

//             const mindarThree = new MindARThree({
//                 container: document.body,
//                 imageTargetSrc: targetMind
//             });
    
//             const { renderer, scene, camera } = mindarThree;

//             // Renderer ayarları
//             renderer.outputColorSpace = THREE.SRGBColorSpace;
//             renderer.toneMapping = THREE.ACESFilmicToneMapping;
//             renderer.toneMappingExposure = 1;

//             // Işıkları ekle
//             const ambientLight = new THREE.AmbientLight(0xffffff, 2);
//             scene.add(ambientLight);

//             const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//             directionalLight.position.set(0, 1, 1);
//             scene.add(directionalLight);

//             // GLB model yükleyici
//             const loader = new GLTFLoader();

//             // Model yükleme fonksiyonu
//             const loadModel = () => {
//                 return new Promise((resolve, reject) => {
//                     loader.load(
//                         modelGlb,
//                         (gltf) => {
//                             // Model başarıyla yüklendi
//                             const model = gltf.scene;
                            
//                             // Modelin ölçeğini ayarla (gerekirse değiştirin)
//                             model.scale.set(0.35, 0.35, 0.35);
                            
//                             // Modelin pozisyonunu ayarla (gerekirse değiştirin)
//                             model.position.set(0, -0.30, 0);
                            
//                             // Modelin rotasyonunu ayarla (gerekirse değiştirin)
//                             model.rotation.x = 0;
/* BÖLÜM 1
import * as THREE from 'three'

document.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const geometry = new THREE.BoxGeometry(1,1,1)

    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })

    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 0, -2)
    cube.rotation.set(0, Math.PI/4, 0)

    scene.add(cube)

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: document.querySelector('canvas')
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})
*/

/* BÖLÜM 2 QUICK START */
// // const THREE = window.MINDAR.IMAGE.THREE;
// import * as THREE from 'three';
// import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';


// console.log(THREE);


// document.addEventListener('DOMContentLoaded', () => {
//     const start = async () => { 
//         try {
//             // Kamera API'sinin varlığını kontrol et
//             if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//                 throw new Error('Tarayıcınız kamera erişimini desteklemiyor. Lütfen modern bir tarayıcı kullanın (Chrome, Firefox, Safari gibi)');
//             }

//             // HTTPS kontrolü - yerel ağ için özel durum
//             const isLocalNetwork = /^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^localhost$|^127\.0\.0\.1$/.test(location.hostname);
//             if (location.protocol !== 'https:' && !isLocalNetwork) {
//                 throw new Error('Kamera erişimi için HTTPS gereklidir. Lütfen sayfayı HTTPS üzerinden açın.');
//             }

//             // Kamera erişimi iste
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             stream.getTracks().forEach(track => track.stop());

//             const mindarThree = new MindARThree({
//                 container: document.body,
//                 imageTargetSrc: './assets/targets/targets.mind'
//             });
    
//             const { renderer, scene, camera } = mindarThree;
    
//             const geometry = new THREE.PlaneGeometry(1,1);
    
//             const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
    
//             const plane = new THREE.Mesh(geometry, material);
    
//             const anchor = mindarThree.addAnchor(0);
//             anchor.group.add(plane);
    
//             await mindarThree.start();
    
//             renderer.setAnimationLoop(() => {
//                 renderer.render(scene, camera);
//             });
//         } catch (error) {
//             console.error('AR deneyimi başlatılırken hata:', error);
            
//             // Kullanıcıya daha anlaşılır hata mesajları göster
//             let errorMessage = error.message;
//             if (error.name === 'NotReadableError') {
//                 errorMessage = 'Kamera erişimi hatası! Lütfen şunları kontrol edin:\n' +
//                              '1. Başka bir uygulama kamerayı kullanmıyor olmalı\n' +
//                              '2. Kamera düzgün bağlı ve çalışıyor olmalı\n' +
//                              '3. Tarayıcının kamera erişim izni olmalı';
//             }
            
//             alert(errorMessage);
//         }
//     }
//     start();
// })

// /* BÖLÜM 2 ımage tracking */
// import * as THREE from 'three';
// import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import modelGlb from './assets/models/model(2).glb?url';
// import targetMind from './assets/targets/targets.mind?url';


// console.log(THREE);

// document.addEventListener('DOMContentLoaded', () => {
//     const start = async () => { 
//         try {
//             // Kamera API'sinin varlığını kontrol et
//             if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//                 throw new Error('Tarayıcınız kamera erişimini desteklemiyor. Lütfen modern bir tarayıcı kullanın (Chrome, Firefox, Safari gibi)');
//             }

//             // HTTPS kontrolü - yerel ağ için özel durum
//             const isLocalNetwork = /^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^localhost$|^127\.0\.0\.1$/.test(location.hostname);
//             if (location.protocol !== 'https:' && !isLocalNetwork) {
//                 throw new Error('Kamera erişimi için HTTPS gereklidir. Lütfen sayfayı HTTPS üzerinden açın.');
//             }

//             // Kamera erişimi iste
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             stream.getTracks().forEach(track => track.stop());

//             const mindarThree = new MindARThree({
//                 container: document.body,
//                 // imageTargetSrc: './assets/targets/targets.mind'
//                 imageTargetSrc: targetMind
//             });
    
//             const { renderer, scene, camera } = mindarThree;

//             // Renderer ayarları
//             renderer.outputColorSpace = THREE.SRGBColorSpace;
//             renderer.toneMapping = THREE.ACESFilmicToneMapping;
//             renderer.toneMappingExposure = 1;

//             // Işıkları ekle
//             const ambientLight = new THREE.AmbientLight(0xffffff, 2);
//             scene.add(ambientLight);

//             const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//             directionalLight.position.set(0, 1, 1);
//             scene.add(directionalLight);

//             // GLB model yükleyici
//             const loader = new GLTFLoader();

//             // Model yükleme fonksiyonu
//             const loadModel = () => {
//                 return new Promise((resolve, reject) => {
//                     loader.load(
//                         // '/assets/models/model(2).glb', 
//                         modelGlb, 
//                         (gltf) => {
//                             // Model başarıyla yüklendi
//                             const model = gltf.scene;
                            
//                             // Modelin ölçeğini ayarla (gerekirse değiştirin)
//                             model.scale.set(0.35, 0.35, 0.35);
                            
//                             // Modelin pozisyonunu ayarla (gerekirse değiştirin)
//                             model.position.set(0, 0, 0);
                            
//                             // Modelin rotasyonunu ayarla (gerekirse değiştirin)
//                             model.rotation.x = Math.PI/2;
//                             model.rotation.y = 0;
//                             model.rotation.z = 0;
                            
//                             resolve(model);
//                         },
//                         (xhr) => {
//                             // Yükleme ilerlemesi
//                             console.log((xhr.loaded / xhr.total * 100) + '% yüklendi');
//                         },
//                         (error) => {
//                             // Hata durumu
//                             console.error('Model yüklenirken hata:', error);
//                             reject(error);
//                         }
//                     );
//                 });
//             };

//             // Modeli yükle ve anchor'a ekle
//             const model = await loadModel();
//             const anchor = mindarThree.addAnchor(0);
//             anchor.group.add(model);
    
//             await mindarThree.start();
    
//             renderer.setAnimationLoop(() => {
//                 renderer.render(scene, camera);
//             });
//         } catch (error) {
//             console.error('AR deneyimi başlatılırken hata:', error);
            
//             let errorMessage = error.message;
//             if (error.name === 'NotReadableError') {
//                 errorMessage = 'Kamera erişimi hatası! Lütfen şunları kontrol edin:\n' +
//                              '1. Başka bir uygulama kamerayı kullanmıyor olmalı\n' +
//                              '2. Kamera düzgün bağlı ve çalışıyor olmalı\n' +
//                              '3. Tarayıcının kamera erişim izni olmalı';
//             }
            
//             alert(errorMessage);
//         }
//     }
//     start();
// })

/*BÖLÜM 3 MOCK WEBCAM  */
/* Bu bölümde ders konusunun dışında eksik olan kısım smooth interpolation için değişkenler görüntülenen modelin titremesini azaltmak için
 filterMinCF, filterBeta eklendi anchorun altında ve start() fonskiyonu içerisinde modelin hareketleri ve titreme sorunu giderildi
 Dersin konusu ise test ederken sürekli kameramıza resmi göstermek yerine belirli bir videoyu ekranda oynatmak üzerinedir
 Dilersek mock webcam için uyguladığımız metodları yorum satırına alarak kamera ile devam edebiliriz
 */
import * as THREE from 'three';
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modelGlb from './assets/models/model(2).glb?url';
import targetMind from './assets/targets/course-banner.mind?url';
import {mockWithVideo, mockWithImage} from "./libs/mindAR/camera-mock";
import courseBanner1 from './assets/mock-videos/course-banner1.png?url';
import courseVideo from './assets/mock-videos/course-banner1.mp4?url';

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        // Mock webcam kullanımı için video caputure oluştur ve kullan manual yöntem
        // navigator.mediaDevices.getUserMedia = () => {
        //     return new Promise((resolve, reject) => {
        //         const video = document.createElement('video');
        //         video.setAttribute("src", "./assets/mock-videos/course-banner1.mp4");
        //         video.setAttribute("loop", "");
                
        //         video.oncanplay = () => {
        //             video.play();
        //             resolve(video.captureStream());
        //         };
        //     })
        // }

        // Mock webcam kullanımı için video caputure oluştur ve kullan hazır metod ile uygulanan yöntem.
        // Bu metoddaki fark hem kullanımının kolay olması hem de start butonuna tıklanmadan videonun oynatılmamasıdır
        // Start butonunun eklenmesinin sebebi ise bazı tarayıcıların herhangi bir event olmadan videoyu otomatik oynatmamasından 
        //dolayıdır
        //mockWithVideo(courseVideo);

        //Dilersek benzer bir metodu video yerine resim içinde uygulayabiliriz
        //mockWithImage("./assets/mock-videos/course-banner1.png");

        //ÖNEMLİ mockWithImage ve mockWithVideo metodlarını kullanırken metodları
        //camera-mock.js deki yapıya uygun olarak çalıştırılmalıdır çünkü start
        //butonu ile metodlar çalıştırılmadığı zaman tarayıcı video veya görseli yüklemiyor

        // MindAR ayarlarını optimize et
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: targetMind,
            filterMinCF: 0.0001, // Tracking stabilitesini artır
            filterBeta: 0.001,   // Smoothing değerini artır
        });
    
        const {renderer, scene, camera} = mindarThree;

        const geometry = new THREE.PlaneGeometry(1,1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
        const plane = new THREE.Mesh(geometry, material);

        // Anchor'a smoothing uygula
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        // Smooth interpolation için değişkenler görüntülenen modelin titremesini azaltmak için
        let lastPosition = new THREE.Vector3();
        let lastQuaternion = new THREE.Quaternion();
        const smoothFactor = 0.1; // Düşük değer daha yumuşak geçiş sağlar

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            // Pozisyon ve rotasyon smoothing
            if (anchor.visible) {
                const currentPosition = anchor.group.position;
                const currentRotation = anchor.group.quaternion;

                // Pozisyon interpolation
                currentPosition.lerp(lastPosition, smoothFactor);
                currentRotation.slerp(lastQuaternion, smoothFactor);

                lastPosition.copy(currentPosition);
                lastQuaternion.copy(currentRotation);
            }
            renderer.render(scene, camera);
        });
    }
    start();
});