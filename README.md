# Savaşan İha Hakem ve Yer Bilgisayarı - _backend_

## [Ön Yüz](https://github.com/barisayyildiz/siha-frontend)  

## Dosya Yapısı

```
project
│
└───hakem
│   │   node_modules/
│   │   index.js
│   
└───backend
    │   node_modules/
    │   index.js
```

**Hakem** dosyası içerisinde hakem masasındaki sunucu temsil edilmektedir. **_Bu sunucu test amacıyla yazılmıştır_**
```
PORT:3000
```  

**Backend** dosyası içerisinde yarışma sırasında kullanılacak yer bilgisayarında çalışan sunucu temsil edilmektedir.  
```
PORT:8080
```
Backend tarafında her 5 saniyede bir rastgele drone bilgisi oluşturulup hakem sunucusuna yollanır. Hakem sunucusunda ise tüm yarışmacılara ait veriler **broadcast** edilir.

## Kullanılan Kütüphaneler  
* Sunucular arası ve önyüz ile canlı veri akışı sağlayabilmek için web soketleri ve [socket.io](https://socket.io/) kütüphanesi kullanılmıştır



Projeyi çalıştırmak için :  

```
git clone https://github.com/barisayyildiz/siha-sunucu  
cd siha-sunucu 
cd hakem  
npm install  
npm start  
cd ..  
cd backend  
npm install  
npm start
```
