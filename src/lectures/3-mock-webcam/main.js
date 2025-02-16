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
         mockWithVideo("./assets/mock-videos/course-banner1.mp4");
 
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