# stitchbloomgarden.site

Website blog + mẫu thêu free của StitchBloomGarden, làm bằng [Astro](https://astro.build), chạy miễn phí trên Cloudflare Pages.
Mỗi lần có thay đổi đẩy lên nhánh `main`, Cloudflare tự dựng lại web sau khoảng 1 phút.

## Chỉnh sửa web bằng Pages CMS (không cần biết code)

Vào https://app.pagescms.org, đăng nhập bằng GitHub, mở repo `stitchbloomgarden.site`. Có 3 mục:

- **Free patterns**: thêm mẫu free. Bấm **Add an entry**, điền tên, mô tả, tải ảnh xem trước và file PDF, dán link Etsy liên quan, rồi **Save**.
- **Blog posts**: viết bài như soạn Word. Cuối bài dán link Etsy các mẫu muốn giới thiệu.
- **Site settings**: khẩu hiệu, mẫu nổi bật ở trang chủ (dán link Etsy), email liên hệ, link form thu email.

Mỗi lần bấm Save, khoảng 1–2 phút sau web tự cập nhật. Bật **Hide (draft)** nếu muốn lưu nháp chưa cho hiện lên web.

## Cập nhật danh sách mẫu Etsy

Trang Shop lấy dữ liệu từ `data/*-listings.csv` (cột: shop, listing_id, title, url, image_1).
Thay file CSV mới vào đó; lần build sau sẽ tự cập nhật.

## Chạy thử trên máy (không bắt buộc)

```
npm install
npm run dev
```

## Cài đặt Cloudflare Pages

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
