import * as THREE from 'three';
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modelGlb from './assets/models/model(2).glb?url';
import targetMind from './assets/targets/targets.mind?url';


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
                // imageTargetSrc: './assets/targets/targets.mind'
                imageTargetSrc: targetMind
            });
    
            const { renderer, scene, camera } = mindarThree;

            // Renderer ayarları
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;

            // Işıkları ekle
            const ambientLight = new THREE.AmbientLight(0xffffff, 2);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
            directionalLight.position.set(0, 1, 1);
            scene.add(directionalLight);

            // GLB model yükleyici
            const loader = new GLTFLoader();

            // Model yükleme fonksiyonu
            const loadModel = () => {
                return new Promise((resolve, reject) => {
                    loader.load(
                        // '/assets/models/model(2).glb', 
                        modelGlb, 
                        (gltf) => {
                            // Model başarıyla yüklendi
                            const model = gltf.scene;
                            
                            // Modelin ölçeğini ayarla (gerekirse değiştirin)
                            model.scale.set(0.35, 0.35, 0.35);
                            
                            // Modelin pozisyonunu ayarla (gerekirse değiştirin)
                            model.position.set(0, 0, 0);
                            
                            // Modelin rotasyonunu ayarla (gerekirse değiştirin)
                            model.rotation.x = Math.PI/2;
                            model.rotation.y = 0;
                            model.rotation.z = 0;
                            
                            resolve(model);
                        },
                        (xhr) => {
                            // Yükleme ilerlemesi
                            console.log((xhr.loaded / xhr.total * 100) + '% yüklendi');
                        },
                        (error) => {
                            // Hata durumu
                            console.error('Model yüklenirken hata:', error);
                            reject(error);
                        }
                    );
                });
            };

            // Modeli yükle ve anchor'a ekle
            const model = await loadModel();
            const anchor = mindarThree.addAnchor(0);
            anchor.group.add(model);
    
            await mindarThree.start();
    
            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
            });
        } catch (error) {
            console.error('AR deneyimi başlatılırken hata:', error);
            
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