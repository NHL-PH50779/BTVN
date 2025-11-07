# Hướng dẫn làm bài

- Thời gian làm bài: 120 phút.
- Download [Repository](https://github.com/hoangnm-ndm/Midtest-Module-C-02) về máy của học viên và thực hiện code trực tiếp trong thư mục này.
- Sau khi làm bài xong, học viên được chấm bài tại chỗ.
- Trong quá trình làm bài, gỡ bỏ và không sử dụng các extensions có sử dụng AI như Tabnine, Github copilot, Codeium, v.v.
- Không mở nhiều cửa sổ VS Code hoặc các phần mềm không liên quan trong quá trình làm bài.
- Được phép mở các trang web lấy giao diện hoặc icons như tailwindCSS, bootstrap, boxicon, fontawesome, .v.v trong quá trình làm bài.

---

## Yêu cầu

- Xây dựng **hệ thống quản trị sản phẩm System Administration Products** sử dụng ReactJS, React Router, json-server bao gồm các tính năng sau:

## 1. Giao diện và routing (1 điểm)

- Xây dựng hệ thống định tuyến để dễ dàng điều hướng cho những tác vụ phía dưới.
- Xử lý route không tồn tại (404).
- Giao diện thân thiện và dễ sử dụng, có thể sử dụng CSS hoặc thư viện UI đơn giản.

## 2. Auth (3 điểm)

- Đăng ký vào hệ thống (bao gồm email, password). (1 điểm)
  - Role mặc định là `member`.
  - Đăng ký thành công chuyển sang trang đăng nhập.
  - Đăng ký thất bại, reset form và hiển thị lỗi.
- Đăng nhập vào hệ thống (bao gồm email, password). (1 điểm)
  - Đăng nhập thành công: Lưu trạng thái đăng nhập (token) và thông tin người dùng trong localStorage.
  - Đăng nhập thất bại: Reset form và hiển thị lỗi.
- Protected Route (xây dựng các tuyến đường được bảo vệ) (1 điểm):
  - Nếu role là `admin`, chuyển vào trang quản lý sản phẩm,
  - Nếu role khác, thông báo `Forbidden: You do not have access to this page`.

**Validation:**

- `email`: phải đúng định dạng email.
- `password`: phải có ít nhất 6 ký tự.
- Trừ 0.5 điểm nếu không validation

---

## 3. Trang quản lý sản phẩm. (2đ)

- **GET**: Hiển thị danh sách sản phẩm dạng bảng, hiện thị các thông tin sau (0.5đ):

  - Tên sản phẩm
  - Giá
  - Hành động: Sửa, Xoá

- **DELETE**: Xoá sản phẩm (0.5đ):

  - Hiển thị hộp thoại xác nhận xoá.
  - Xoá thành công, cập nhật lại danh sách sản phẩm.

- **POST**: Thêm sản phẩm (0.5đ):

  - Nút thêm sản phẩm chuyển đến trang thêm sản phẩm.
  - Thêm thành công, quay về trang danh sách sản phẩm.

- **PUT**: Sửa sản phẩm (0.5đ):

  - Nút sửa sản phẩm chuyển đến trang cập nhật sản phẩm.
  - Cập nhật thành công, quay về trang danh sách sản phẩm.

- **Validation:**

- `title`: không được để trống và tối thiểu 3 ký tự.
- `price`: phải là số lớn hơn hoặc bằng 0.
- `category`: phải chọn danh mục, danh mục được lấy từ `/categories`, nếu không có danh mục, không thể thêm/sửa sản phẩm. Khi thêm được danh mục, lưu `categoryId` vào trường `categoryId` của sản phẩm.
- `description`: Mô tả sản phẩm, không bắt buộc nhập.
- `thumbnail`: URL hình ảnh sản phẩm, không bắt buộc nhập.
- `stock`: số lượng trong kho, phải là số nguyên dương hoặc bằng 0.
- Trừ 0.5 điểm nếu không validation.

---

## 4. Trang quản lý danh mục (2đ)

- **GET**: Hiển thị danh sách danh mục dạng bảng, hiện thị các thông tin sau (0.5đ):

  - Tên danh mục
  - Slug
  - Hành động: Sửa, Xoá.

- **DELETE**: Xoá danh mục (0.5đ):

  - Hiển thị hộp thoại xác nhận xoá.
  - Xoá thành công, cập nhật lại danh sách danh mục.
  - Nếu danh mục có sản phẩm, không được xoá và hiển thị thông báo lỗi (Gợi ý: đọc documentation của json-server để thực hiện yêu cầu).

- **POST**: Thêm danh mục (0.5đ):

  - Nút thêm danh mục chuyển đến trang thêm danh mục.
  - Thêm thành công, quay về trang danh sách danh mục.

- **PUT**: Sửa danh mục (0.5đ):

  - Nút sửa danh mục chuyển đến trang cập nhật danh mục.
  - Cập nhật thành công, quay về trang danh sách danh mục.

**Validation:**

- `title`: không được để trống và tối thiểu 3 ký tự.
- `slug`: không để trống và không chứa khoảng trắng.

---

## 5. Tính năng nâng cao (2 điểm)

- Có thể tìm sản phẩm theo tên sản phẩm (1đ).
- Có thể lọc sản phẩm theo danh mục (1đ).

---

## Quy ước tính điểm

- Tổng điểm: 10đ.
  - Giao diện và routing: 1đ
  - Auth: 3đ
  - Trang quản lý sản phẩm: 2đ
  - Trang quản lý danh mục: 2đ
  - Tính năng nâng cao: 2đ

---Hết---
