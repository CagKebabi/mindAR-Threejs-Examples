// /* BÖLÜM 2 ımage tracking */
import * as THREE from 'three';
import {MindARThree} from 'mind-ar/dist/mindar-image-three.prod.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import modelGlb from './assets/models/model(2).glb?url';
import floorModelGlb from './assets/catalog/smart_home_interior_floor_plan.glb?url';
import floorModelGlb2 from './assets/catalog/3d_view_office_floor_plan_virtual_reality.glb?url';
import floorModelGlb3 from './assets/catalog/2_bhk_cut_floor_plan_3.glb?url';
//import floorModelGlb3 from './assets/catalog/3d_floor_plan_3.glb?url';2_bhk_cut_floor_plan_3
// import targetMind from './assets/targets/targets.mind?url';
//import targetMind from './assets/catalog/targets.mind?url';
import targetMind from './assets/catalog/targetsMultiple3.mind?url';

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
                imageTargetSrc: targetMind,
                filterMinCF: 0.001, // Tracking stabilitesini artır
                filterBeta: 0.01,   // Smoothing değerini artır
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
            // Model 1
            const loadModel = () => {
                return new Promise((resolve, reject) => {
                    loader.load(
                        // '/assets/models/model(2).glb', 
                        floorModelGlb, 
                        (gltf) => {
                            // Model başarıyla yüklendi
                            const model = gltf.scene;
                            
                            // Modelin ölçeğini ayarla 
                            model.scale.set(0.1, 0.1, 0.1);
                            
                            // Modelin pozisyonunu ayarla 
                            model.position.set(0.7, -0.3, 0);
                            
                            // Modelin rotasyonunu ayarla 
                            model.rotation.x = Math.PI/2;
                            model.rotation.y = 0;
                            model.rotation.z = 0;
                            
                            resolve(model);
                        },
                        (xhr) => {
                            // Yükleme ilerlemesi
                            console.log((xhr.loaded / xhr.total * 100) + '% yüklendi');
                            document.getElementById('progress1').innerText = Math.round((xhr.loaded / xhr.total) * 100) + '%';
                        },
                        (error) => {
                            // Hata durumu
                            console.error('Model yüklenirken hata:', error);
                            reject(error);
                        }
                    );
                });
            };

            // Model 2
            const loadModel2 = () => {
                return new Promise((resolve, reject) => {
                    loader.load(
                        // '/assets/models/model(2).glb', 
                        floorModelGlb2, 
                        (gltf) => {
                            // Model başarıyla yüklendi
                            const model = gltf.scene;
                            
                            // Modelin ölçeğini ayarla 
                            model.scale.set(0.1, 0.1, 0.1);
                            
                            // Modelin pozisyonunu ayarla 
                            model.position.set(0, 0, 0);
                            
                            // Modelin rotasyonunu ayarla 
                            model.rotation.x = Math.PI/2;
                            model.rotation.y = 0;
                            model.rotation.z = 0;
                            
                            resolve(model);
                        },
                        (xhr) => {
                            // Yükleme ilerlemesi
                            console.log((xhr.loaded / xhr.total * 100) + '% yüklendi');
                            document.getElementById('progress2').innerText = Math.round((xhr.loaded / xhr.total) * 100) + '%';
                        },
                        (error) => {
                            // Hata durumu
                            console.error('Model yüklenirken hata:', error);
                            reject(error);
                        }
                    );
                });
            };

            // Model 3
            const loadModel3 = () => {
                return new Promise((resolve, reject) => {
                    loader.load(
                        floorModelGlb3, 
                        (gltf) => {
                            // Model başarıyla yüklendi
                            const model = gltf.scene;
                            
                            // Modelin materyallerini güncelle
                            model.traverse((child) => {
                                if (child.isMesh) {
                                    // Mevcut materyali koru ama ayarlarını güncelle
                                    child.material.needsUpdate = true;
                                    child.material.side = THREE.DoubleSide;
                                    child.material.shadowSide = THREE.DoubleSide;
                                    child.castShadow = true;
                                    child.receiveShadow = true;
                                }
                            });
                            
                            model.scale.set(0.1, 0.1, 0.1);
                            model.position.set(-0.2, 0.3, 0);
                            model.rotation.x = Math.PI/2;
                            model.rotation.y = 0;
                            model.rotation.z = 0;
                            
                            resolve(model);
                        },
                        (xhr) => {
                            // Yükleme ilerlemesi
                            console.log(Math.round((xhr.loaded / xhr.total) * 100) + '% yüklendi');
                            document.getElementById('progress3').innerText = Math.round((xhr.loaded / xhr.total) * 100) + '%';
                            setTimeout(() => {
                                document.getElementById('loadingText').style.display = 'none';
                                document.getElementById('startButton').style.display = 'block';
                            }, 5000);
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
            const model2 = await loadModel2();
            const model3 = await loadModel3();

            const anchor = mindarThree.addAnchor(0);
            anchor.group.add(model);

            const anchor2 = mindarThree.addAnchor(1);
            anchor2.group.add(model2);
            
            const anchor3 = mindarThree.addAnchor(2);
            anchor3.group.add(model3);

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