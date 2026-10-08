# stitchbloomgarden.site

Website blog + mẫu thêu free của StitchBloomGarden, làm bằng [Astro](https://astro.build), chạy miễn phí trên Cloudflare Pages.
Mỗi lần có thay đổi đẩy lên nhánh `main`, Cloudflare tự dựng lại web sau khoảng 1 phút.

## Thêm mẫu free

1. Bỏ file PDF vào `public/patterns/` (ví dụ `little-ghost.pdf`, tên không dấu, không cách).
2. Bỏ ảnh xem trước (vuông, khoảng 1200x1200) vào `public/images/freebies/` (ví dụ `little-ghost.jpg`).
3. Copy file `src/content/freebies/_example.md` thành `src/content/freebies/little-ghost.md`.
   Tên file chính là địa chỉ trang: `stitchbloomgarden.site/free-patterns/little-ghost/`.
4. Sửa các dòng trong file: tên, mô tả, kích thước, số màu DMC, đường dẫn ảnh và PDF, mẫu Etsy liên quan (`related`, ghi listing id). Đổi `draft: true` thành `draft: false`.
5. Muốn mẫu chỉ gửi qua email thì để `emailOnly: true` (chỉ có tác dụng khi đã bật form email bên dưới).

## Viết bài blog

Tạo file `.md` mới trong `src/content/blog/`, chép phần đầu (giữa hai dòng `---`) từ một bài có sẵn rồi sửa.
`patterns` là danh sách listing id Etsy sẽ hiện ở cuối bài.

## Bật form thu email

Mở `src/site.config.ts`, dán link form của Kit hoặc MailerLite vào `NEWSLETTER.action` (hướng dẫn ngay trong file).
Khi để trống, chỗ đăng ký sẽ hiện nút "Follow the shop on Etsy".

## Cập nhật danh sách mẫu Etsy

Trang Shop lấy dữ liệu từ `data/*-listings.csv` (cột: shop, listing_id, title, url, image_1).
Thay file CSV mới vào đó; lần build sau sẽ tự cập nhật. Mẫu nổi bật ở trang chủ chỉnh trong `FEATURED_IDS` của `src/site.config.ts`.

## Chạy thử trên máy (không bắt buộc)

```
npm install
npm run dev
```

## Cài đặt Cloudflare Pages

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
