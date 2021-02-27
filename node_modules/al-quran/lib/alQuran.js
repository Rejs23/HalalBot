const Request = require('./util/Request')

class Quran {

  constructor() {
   this.Request = new Request()
  }

  surat() {
    return this.Request.send(['surat'])
  }

  nomorSurat(nomor) {
    return this.Request.send(['surat'], [nomor])
  }

  tampilAyat(surat, ayat) {
    return this.Request.send(['surat', 'ayat'], [surat, ayat])
  }

  bahasaAyat(surat, ayat, bahasa) {
    return this.Request.send(['surat', 'ayat', 'bahasa'], [surat, ayat, bahasa])
  }

  daftarBahasa() {
    return this.Request.send(['bahasa'])
  }

  pencarian(kata, mulai, limit, bahasa) {
    return this.Request.send(['cari', 'bahasa', 'mulai', 'limit'], [kata, bahasa, mulai, limit])
  }

  catatanDepag(nomor) {
    return this.Request.send(['catatan'], [nomor])
  }

  quranAcak(){
    return this.Request.send(['acak'])
  }

}

module.exports = new Quran()