class anu extends Anuncio
{
    constructor(id,titulo,transaccion,descripcion,precio,puertas,kms,potencia)
    {
        super(id,titulo,transaccion,descripcion,precio);
        this.num_puertas=puertas;
        this.num_kms=kms;
        this.potencia=potencia;
        this.active = true;
    }
}