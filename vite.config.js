import { defineConfig } from "vite";
import sassGlobImports from "vite-plugin-sass-glob-import";

export default defineConfig({
  root: "./src", //開発ディレクトリ設定

  build: {
    outDir: "../dist", //index.htmlからの相対パス
    emptyOutDir: true, //ビルド時の警告を防ぐ

    rollupOptions: {
      //ファイル出力設定
      // input: "/index.html", //バンドルのエントリーポイント
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];
          if (/png|jpeg|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }
          //ビルド時のCSS名を明記してコントロールする
          if (extType === "css") {
            return `assets/css/style.css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
    },
  },

  plugins: [sassGlobImports()],
});
