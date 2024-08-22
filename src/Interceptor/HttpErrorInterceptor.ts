/************************************************************************/
/* All Rights Reserved. Copyright (C) Sorimachi Co., Ltd.               */
/************************************************************************/
/* File Name    : HttpErrorInterceptor.ts                               */
/* Function     : Catch error HttpResponse                              */
/* System Name  : Web Hanbai  V1.0.0                                    */
/* Create       : AnhTai 2022/10/10                                     */
/* Update       :                                                       */
/* Comment      :                                                       */
/************************************************************************/
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError, catchError, of, finalize } from 'rxjs';

/**************************
 * Enum các mã lỗi tự tạo *
 **************************/
export enum EStatusCodeCustom {
	/// Lỗi tài khoản đang được sử dụng - 600
	AccountIsUsing = 600
}

/****************
 * Phản hồi lỗi *
 ****************/
interface ErrorResponse {
    statuscode?: number;
    status?: number;
    error: string;
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(
		private dialog: MatDialog,
	) { }
	
	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		// Hiện spin loading trước khi request

		return next.handle(this.addOptionsCredentials(request)).pipe(
			catchError((err) => {
				// Biến đánh dấu error đã được handle chưa
				let handled: boolean = false;
				if (err instanceof HttpErrorResponse) {
					// Lỗi phía client-side
					if (err.error instanceof ErrorEvent) {
						console.error('Error Event');
					}
					// Lỗi phía backend response về
					else {
						switch (err.status) {
							// Lỗi xác thực 401 - Unauthorized (token sai, chưa đăng nhập,...)
							case HttpStatusCode.Unauthorized:
								
								handled = true;
								break;
							// Lỗi phân quyền 403 - Forbidden (Sai role)
							case HttpStatusCode.Forbidden:
								
								handled = true;
								break;
							// Lỗi timeout 408 - RequestTimeout
							case HttpStatusCode.RequestTimeout:
								
								handled = true;
								break;
							// Lỗi AccountIsUsing 69 (Account đang đăng nhập bởi người dùng khác)
							case EStatusCodeCustom.AccountIsUsing:
								
								handled = true;
								break;
							// Lỗi Bad Request 400 (Lỗi server không thực hiện được api)
							case HttpStatusCode.BadRequest:
								var errorResponse = this.parseError(err) as ErrorResponse;
								var statusCodeOfBadRequest = errorResponse.statuscode || errorResponse.status;
								if (statusCodeOfBadRequest) {
									
								} else {
									let result = this.formatErrorMessage( errorResponse.error ? errorResponse.error : err.error);
									
								}
								handled = true;
								break;
							// Lỗi Not Found 404 (Api không hợp lệ)
							case HttpStatusCode.NotFound:
								
								handled = true;
								break;
							default:
								break;
						}
					}
				} else {
					console.error('Other Errors');
				}

				if (handled) {
					return of(err);
				}
				return throwError(() => {
					return err
				});

			}),
			finalize(() => {
				// Ẩn spin loading sau khi request xong
				
			})
		);
	}

	/************************************************************************
	 * Thiết lập withCredentials trên mỗi resquest để giao tiếp với cookie  *
	 * @param {HttpRequest<any>} request                                    *
	 ************************************************************************/
	private addOptionsCredentials(request: HttpRequest<any>) {
		return request.clone({
			withCredentials: true
		});
	}

	/****************************************************************************************
	 * Hiển thị dialog thông báo logout và tùy chọn xóa loginstate                          *
	 * @param {string} message: Message hiển thị trên dialog                                *
	 * @param {boolean} isDeleteLoginState: xóa loginstate của user hay không (true: xóa)   *
	 ****************************************************************************************/

	/***************************************
	 * Xử lý thông tin lỗi				   *	
	 * @param {any} err Lỗi				   *	
	 * @returns Thông tin lỗi cuối cùng    *
	 ***************************************/
	private parseError(err: any): ErrorResponse {
		try {
			return JSON.parse(err.error);
		} catch (e) {
			return { error: err.error };
		}
	}

	/**************************************
	 * Xử lý chuỗi nội dung lỗi			  *
	 * @param {string} error Nội dung lỗi *
	 * @returns Nội dung lỗi			  *
	 **************************************/
	private formatErrorMessage(error: string): string {
		let result = error.replace(/[\[\]]/g, '');
		var chars = {
			'"': '',
			',': '<br>',
		};
		return result.replace(/[,"]/g, m => chars[m as keyof typeof chars]);
	}
}
