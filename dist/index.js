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
            width: 300,
            height: 200,
            channels: 4,
            background: { r: 255, g: 0, b: 0 }
        }
    })
        .png();
    const data = yield image.toBuffer();
    const meta = yield image.metadata();
    console.log(data);
    console.log(meta);
}))();
//# sourceMappingURL=index.js.map