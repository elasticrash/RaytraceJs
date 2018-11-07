"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = __importStar(require("sharp"));
(() => __awaiter(this, void 0, void 0, function* () {
    const image = sharp.default({
        create: {
            width: 200,
            height: 100,
            channels: 3,
            background: { r: 255, g: 0, b: 0 }
        }
    }).png();
    const data = yield image.raw().toBuffer();
    const meta = yield image.metadata();
    console.log(data.length);
    console.log(meta);
    if (meta.width && meta.height && meta.channels) {
        for (let i = 0; i < meta.width; i += 1) {
            for (let j = 0; j < meta.height; j++) {
                const offset = 3 * (meta.width * j + i);
                data[offset] = 255 * (j / meta.height);
                data[offset + 1] = 255 * (i / meta.width);
                data[offset + 2] = 255 * 0.2;
            }
        }
        yield sharp.default(data, { raw: { width: meta.width, height: meta.height, channels: meta.channels } }).toFile('test.png');
    }
}))();
//# sourceMappingURL=index.js.map