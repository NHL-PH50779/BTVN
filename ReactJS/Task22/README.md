# Hướng dẫn làm bài

- Thời gian làm bài: 120 phút.
- Download [Repository](https://github.com/hoangnm-ndm/MidTest-Module-C-01) về máy của học viên và thực hiện code trực tiếp trong thư mục này.
- Sau khi làm bài xong, học viên được chấm bài tại chỗ.
- Trong quá trình làm bài, gỡ bỏ và không sử dụng các extensions có sử dụng AI như Tabnine, Github copilot, Codeium, v.v.
- Không mở nhiều cửa sổ VS Code hoặc các phần mềm không liên quan trong quá trình làm bài.
- Được phép mở các trang web lấy giao diện hoặc icons như tailwindCSS, bootstrap, boxicon, fontawesome, .v.v trong quá trình làm bài.

---

## Yêu cầu

Xây dựng ứng dụng **quản lý học tập (LMS)** với ReactJS và `json-server` bao gồm các tính năng sau:

## 1. Giao diện và routing (1 điểm)

- Xây dựng hệ thống định tuyến để dễ dàng điều hướng cho những tác vụ phía dưới.
- Xử lý route không tồn tại (404).
- Giao diện thân thiện và dễ sử dụng, có thể sử dụng CSS hoặc thư viện UI đơn giản.

## 2. Auth (3 điểm)

- Đăng ký vào hệ thống (bao gồm email, password, fullname). (1 điểm)
  - Role mặc định là `student`.
  - Đăng ký thành công chuyển sang trang đăng nhập.
  - Đăng ký thất bại, reset form và hiển thị lỗi.
- Đăng nhập vào hệ thống (bao gồm email, password). (1 điểm)
  - Đăng nhập thành công: lưu trạng thái đăng nhập (token) và thông tin người dùng trong localStorage.
  - Đăng nhập thất bại: reset form và hiển thị lỗi.
- Protected Route (xây dựng các tuyến đường được bảo vệ) (1 điểm):
  - Nếu role là `admin`, chuyển vào trang quản lý khoá học của admin,
  - Nếu role khác, thông báo `Forbidden: You don't have permission to access this page.`

**Validation:**

- `email`: phải đúng định dạng email.
- `password`: phải có ít nhất 6 ký tự.
- `fullname`: không được để trống và tối thiểu 6 ký tự.
- Trừ 0.5 điểm nếu không validation

**Những tính năng sau chỉ áp dụng với role là admin:**

## 3. Quản Lý Khóa Học (courses) (2 điểm)

- **GET**: Lấy danh sách khóa học từ API và hiển thị đầy đủ thông tin.
- **POST**: Thêm mới khóa học qua form, thêm xong quay lại trang danh sách.
- **PUT**: Cập nhật thông tin khóa học, thêm xong quay lại trang danh sách.
- **DELETE**: Xóa khóa học (có confirm), xoá xong cập nhật lại danh sách.

**Validation:**

- `title`: không được để trống và tối thiểu 6 ký tự.
- `price`: phải là số dương.
- `description`: là chuỗi không bắt buộc.
- Trừ 0.5 điểm nếu không validation

## 4. Quản Lý Bài Học (lessons) (2 điểm)

- **GET**: Lấy danh sách bài học theo khóa học (khi ấn vào tên khoá học sẽ vào trang danh sách bài học thuộc khoá học đó).
- **POST**: Thêm bài học mới cho khóa học, khi thêm xong quay lại trang danh sách bài học thuộc khoá học đó.
- **PUT**: Cập nhật thông tin bài học, khi cập nhật xong quay lại trang danh sách bài học thuộc khoá học đó.
- **DELETE**: Xóa bài học (có confirm), xoá xong cập nhật lại danh sách.

**Validation:**

- `title`: không được để trống và tối thiểu 6 ký tự.
- `content`: là chuỗi không bắt buộc.
- Trừ 0.5 điểm nếu không validation

## 5. Các tính năng nâng cao (2 điểm)

- Tìm kiếm khóa học theo tên (không cần xử lý vấn đề tên tiếng Việt).
- Sắp xếp khóa học theo giá (tăng dần, giảm dần, huỷ sắp xếp).

## Quy ước tính điểm

- Tổng điểm: **10 điểm.**
  - Giao diện và routing: **1 điểm.**
  - Auth:
    - Đăng ký: **1 điểm.**
    - Đăng nhập: **1 điểm.**
    - Protected Route: **1 điểm.**
  - Quản lý khóa học: **2 điểm.**
  - Quản lý bài học: **2 điểm.**
  - Các tính năng nâng cao: **2 điểm.**
