# API 接口文档

## 通用说明
- **Base URL**: `http://localhost:8080`
- **统一响应**: `{ "code": 200, "msg": null, "data": {...} }`
- **请求头**: `user-id: {userId}` (部分接口需要)

---

## 用户模块 `/user`

| 方法 | 路径 | 说明 | 参数 | 返回 |
|------|------|------|------|------|
| GET | `/generateCode` | 生成注册码 | - | `String` |
| GET | `/list` | 用户列表 | - | `List<UserVo>` |
| GET | `/info` | 用户详情 | `id: Long` | `UserVo` |
| POST | `/loginByCode` | 识别码登录 | `{ code }` | `UserVo` |
| POST | `/register` | 注册用户 | `{ code, nick?, phone?, ... }` | `UserVo` |
| POST | `/update` | 更新用户 | `{ id?, name?, nick?, avatar?, ... }` | `UserVo` |
| POST | `/delete` | 删除用户 | `id: Long` | `Boolean` |

---

## 拍卖模块 `/auction`

| 方法 | 路径 | 说明 | 参数 | 返回 |
|------|------|------|------|------|
| GET | `/list` | 拍卖列表 | `id?, title?, status?, ...` | `List<AuctionVo>` |
| GET | `/info` | 拍卖详情 | `id: Long` | `AuctionVo` |
| POST | `/uploadImages` | 上传图片 | `files: MultipartFile[]` | `List<String>` |
| POST | `/add` | 新建拍卖 | `{ title, imgUrls?, minPrice?, ... }` | `AuctionVo` |
| POST | `/update` | 更新拍卖 | `{ id, title?, status?, ... }` | `AuctionVo` |
| POST | `/delete` | 删除拍卖 | `id: Long` | `Boolean` |

**拍卖状态**: `0`草稿 `1`未开始 `2`进行中 `3`中止 `4`完成 `5`流标

---

## 出价模块 `/offer`

| 方法 | 路径 | 说明 | 参数 | 返回 |
|------|------|------|------|------|
| GET | `/list` | 出价列表 | `auctionId?, userId?, ...` | `List<OfferVo>` |
| GET | `/info` | 出价详情 | `id: Long` | `OfferVo` |
| POST | `/add` | 提交出价 | `{ auctionId, userId, price }` | `OfferVo` |
| POST | `/update` | 更新出价 | `{ id, price?, win?, ... }` | `OfferVo` |
| POST | `/delete` | 删除出价 | `id: Long` | `Boolean` |

**中标状态**: `0`未中 `1`中标

---

## 测试接口 `/hello`

| 方法 | 路径 | 说明 | 参数 | 返回 |
|------|------|------|------|------|
| GET | `/touch` | 健康检查 | `name?: String` | `"hello {name}"` |

---

## 数据模型

### UserVo
```json
{
  "id": 1,
  "code": "ABC123",
  "name": "张三",
  "nick": "昵称",
  "phone": "13800138000",
  "avatar": "https://...",
  "role": 0
}
```

### AuctionVo
```json
{
  "id": 1,
  "title": "拍品标题",
  "imgUrl": "https://...",
  "imgUrls": ["https://...", "https://..."],
  "subTitle": "副标题",
  "minPrice": 1000.0,
  "maxPrice": 5000.0,
  "startTime": "2025-01-01",
  "endTime": "2025-01-10",
  "status": 2,
  "offerId": null
}
```

### OfferVo
```json
{
  "id": 1,
  "auctionId": 1,
  "user": { "id": 1, "nick": "竞拍者" },
  "price": 3000.0,
  "win": 0
}
```
