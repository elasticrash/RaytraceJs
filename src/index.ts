import * as  sharp from 'sharp'; 

(async () => {
    const image = sharp.default({
        create: {
          width: 300,
          height: 200,
          channels: 4,
          background: { r: 255, g: 0, b: 0 }
        }
      })
      .png();


      const data = await image.toBuffer();
      const meta = await image.metadata();


      console.log(data);
      console.log(meta);

})();