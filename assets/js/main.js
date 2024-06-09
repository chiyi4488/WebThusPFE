// // 初始化所有tooltips
// $(document).ready(function () {
//     const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-mdb-toggle="tooltip"]'));
//     tooltipTriggerList.map(function (tooltipTriggerEl) {
//         return new mdb.Tooltip(tooltipTriggerEl);
//     });
// });

// 儲存資料到 localStorage
function saveData(key, value) {
    if (value) {
        localStorage.setItem(key, value);
    }
}

function logout() {
    clearData(['loginID']);
    alert("登出成功");
    window.location.href = '/';
}

// 清除資料從 localStorage
function clearData(keys) {
    keys.forEach(key => localStorage.removeItem(key));
}

// OOBE
$(document).ready(function () {
    const OOBE_STATUS = localStorage.getItem('OOBE_STATUS') || false;
    const rentInfoList = [
        { id: "846545648", date: "2024-06-10", timeSlots: ["08:00-09:00", "09:00-10:00"], item: "顯微鏡", reason: "學術研究", status: "尚未繳費", submitTime: "2024-06-01T10:00:00Z" },
        { id: "567890123", date: "2024-06-11", timeSlots: ["10:00-11:00", "11:00-12:00"], item: "光譜儀", reason: "化學實驗", status: "預約成功", submitTime: "2024-06-02T10:00:00Z" },
        { id: "987654321", date: "2024-05-12", timeSlots: ["13:00-14:00", "14:00-15:00"], item: "電子顯微鏡", reason: "材料分析", status: "繳費逾期", submitTime: "2024-06-03T10:00:00Z" },
        { id: "123456789", date: "2024-06-13", timeSlots: ["15:00-16:00", "16:00-17:00"], item: "電子秤", reason: "物理實驗", status: "已經取消", submitTime: "2024-06-04T10:00:00Z" },
        { id: "234567891", date: "2024-06-14", timeSlots: ["17:00-18:00", "18:00-19:00"], item: "離心機", reason: "生物實驗", status: "預約成功", submitTime: "2024-06-05T10:00:00Z" },
        { id: "345678912", date: "2024-05-15", timeSlots: ["19:00-20:00", "20:00-21:00"], item: "顯微鏡", reason: "細胞觀察", status: "繳費逾期", submitTime: "2024-06-06T10:00:00Z" },
        { id: "456789123", date: "2024-06-16", timeSlots: ["21:00-22:00", "22:00-23:00"], item: "光譜儀", reason: "光學分析", status: "尚未繳費", submitTime: "2024-06-07T10:00:00Z" },
        { id: "567891234", date: "2024-06-17", timeSlots: ["08:00-09:00", "09:00-10:00"], item: "電子顯微鏡", reason: "材料分析", status: "預約成功", submitTime: "2024-06-08T10:00:00Z" },
        { id: "846545648", date: "2024-05-18", timeSlots: ["10:00-11:00", "11:00-12:00"], item: "離心機", reason: "生物實驗", status: "繳費逾期", submitTime: "2024-06-09T10:00:00Z" },
        { id: "567890123", date: "2024-06-19", timeSlots: ["13:00-14:00", "14:00-15:00"], item: "電子秤", reason: "化學實驗", status: "尚未繳費", submitTime: "2024-06-10T10:00:00Z" },
        { id: "987654321", date: "2024-06-20", timeSlots: ["15:00-16:00", "16:00-17:00"], item: "光譜儀", reason: "物理實驗", status: "預約成功", submitTime: "2024-06-11T10:00:00Z" },
        { id: "123456789", date: "2024-05-21", timeSlots: ["17:00-18:00", "18:00-19:00"], item: "顯微鏡", reason: "學術研究", status: "已經取消", submitTime: "2024-06-12T10:00:00Z" },
        { id: "234567891", date: "2024-06-22", timeSlots: ["19:00-20:00", "20:00-21:00"], item: "離心機", reason: "細胞觀察", status: "尚未繳費", submitTime: "2024-06-13T10:00:00Z" },
        { id: "345678912", date: "2024-06-23", timeSlots: ["21:00-22:00", "22:00-23:00"], item: "電子顯微鏡", reason: "光學分析", status: "預約成功", submitTime: "2024-06-14T10:00:00Z" },
        { id: "456789123", date: "2024-05-24", timeSlots: ["08:00-09:00", "09:00-10:00"], item: "光譜儀", reason: "材料分析", status: "繳費逾期", submitTime: "2024-06-15T10:00:00Z" },
        { id: "846545648", date: "2024-06-28", timeSlots: ["13:00-14:00", "14:00-15:00"], item: "電子顯微鏡", reason: "材料分析", status: "預約成功", submitTime: "2024-06-15T10:00:00Z" },
        { id: "846545648", date: "2024-06-30", timeSlots: ["17:00-18:00", "18:00-19:00"], item: "離心機", reason: "生物實驗", status: "已經取消", submitTime: "2024-06-15T10:00:00Z" }

    ];
    const userData = [
        { name: "齋一", idNumber: "846545648", email: "jimmy@example.com", phone: "0968558215", password: "00000" },
        { name: "李四", idNumber: "567890123", email: "lee@example.com", phone: "0987654321", password: "12345" },
        { name: "王五", idNumber: "987654321", email: "wang@example.com", phone: "0912345678", password: "54321" },
        { name: "趙六", idNumber: "123456789", email: "zhao@example.com", phone: "0923456789", password: "11111" },
        { name: "孫七", idNumber: "234567891", email: "sun@example.com", phone: "0934567890", password: "22222" },
        { name: "周八", idNumber: "345678912", email: "zhou@example.com", phone: "0945678901", password: "33333" },
        { name: "吳九", idNumber: "456789123", email: "wu@example.com", phone: "0956789012", password: "44444" },
        { name: "鄭十", idNumber: "567891234", email: "zheng@example.com", phone: "0967890123", password: "55555" }
    ];
    if (OOBE_STATUS == false) {
        saveData('OOBE_STATUS', true);
        saveData('rentInfoList', JSON.stringify(rentInfoList));
        saveData('userData', JSON.stringify(userData));
    }
});

// navbar
$(document).ready(function () {
    const loginID = localStorage.getItem('loginID');
    const dynamicButton = $('#dynamicButton');
    const dynamicLogout = $('#dynamicLogout');
    const userOperationDropdown = $('#userOperationDropdown');

    if (loginID) {
        dynamicButton.hide();
        dynamicLogout.show();
        userOperationDropdown.show();
    } else {
        dynamicButton.text('註冊');
        dynamicButton.attr('href', '/register/');
        dynamicButton.addClass('btn-warning').removeClass('btn-secondary');
        dynamicLogout.hide();
        userOperationDropdown.hide();
    }
});

// step-1
function step1Chosen(id) {
    saveData("step1Item", id);
    window.location.href = '/step-2/';
}

// step-2
$(document).ready(function () {
    const loginID = localStorage.getItem('loginID');
    let userData = JSON.parse(localStorage.getItem('userData')) || [];
    const currentUser = userData.find(user => user.idNumber === loginID);
    const name = currentUser ? currentUser.name : '';
    const phone = currentUser ? currentUser.phone : '';

    let isTimeSlotVisible = false;

    if (name) {
        $('#name').val(name);
    }
    if (phone) {
        $('#phone').val(phone);
    }
    if (loginID) {
        $('#idNumber').val(loginID);
    }

    $('#rentDate').change(function () {
        const selectedDate = $('#rentDate').val();
        localStorage.setItem('step2Date', selectedDate);

        // 根據當天租借狀態禁用已被租借的時段
        disableOccupiedTimeSlots(selectedDate);

        // 顯示租借時段，並淡入效果，僅第一次輸入時
        if (!isTimeSlotVisible) {
            $('#timeSlotContainer').fadeIn(800);
            isTimeSlotVisible = true;
        }
    });

    $('#rentReason').change(function () {
        const rentReason = $('#rentReason').val();
        localStorage.setItem('step2Reason', rentReason);
    });

    const timeSlots = document.querySelectorAll('#timeSlotList .list-group-item');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function (event) {
            event.preventDefault();
            if (!this.hasAttribute('disabled')) {
                this.classList.toggle('active');
                saveSelectedTimeSlots();
            }
        });
    });

    function saveSelectedTimeSlots() {
        const selectedSlots = [];
        $('#timeSlotList .list-group-item.active').each(function () {
            selectedSlots.push($(this).text().trim());
        });
        localStorage.setItem('step2Time', JSON.stringify(selectedSlots));
    }

    function disableOccupiedTimeSlots(date) {
        const rentInfoList = JSON.parse(localStorage.getItem('rentInfoList')) || [];
        const occupiedTimeSlots = rentInfoList.filter(info => info.date === date).flatMap(info => info.timeSlots);

        const timeSlotsArray = Array.from(timeSlots);
        let hasOccupiedSlots = false;

        // 清除之前的 disabled 狀態
        timeSlotsArray.forEach(slot => {
            slot.removeAttribute('disabled');
        });

        // 禁用已被租借的時段
        timeSlotsArray.forEach(slot => {
            if (occupiedTimeSlots.includes(slot.textContent.trim())) {
                slot.setAttribute('disabled', 'disabled');
                hasOccupiedSlots = true;
            }
        });

        // 如果當天完全沒有租借，隨機禁用三個時段
        if (!hasOccupiedSlots) {
            disableRandomTimeSlots();
        }
    }

    function disableRandomTimeSlots() {
        const timeSlotsArray = Array.from(timeSlots);
        // 清除之前的 disabled 狀態
        timeSlotsArray.forEach(slot => {
            slot.removeAttribute('disabled');
        });

        // 隨機選取三個時段
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * timeSlotsArray.length);
            const selectedSlot = timeSlotsArray.splice(randomIndex, 1)[0];
            selectedSlot.setAttribute('disabled', 'disabled');
        }
    }

    $('#nextStepButton').click(function (e) {
        e.preventDefault();

        // 檢查所有必填欄位是否已填寫
        if ($('#rentDate').val() && $('#rentReason').val() && localStorage.getItem('step2Time')) {
            window.location.href = '/step-3';
        } else {
            const toastLiveExample = $('#liveToast');
            const toastBootstrap = new bootstrap.Toast(toastLiveExample);
            toastBootstrap.show()
            setTimeout(function () {
                toastBootstrap.fadeOut();
            }, 5000);
        }
    });
});


// step-3
$(document).ready(function () {
    const loginID = localStorage.getItem('loginID');
    let userData = JSON.parse(localStorage.getItem('userData')) || [];
    const currentUser = userData.find(user => user.idNumber === loginID);
    const name = currentUser ? currentUser.name : '';
    const contactPhone = currentUser ? currentUser.phone : '';
    const selectedRentDate = localStorage.getItem('step2Date');
    const rentReason = localStorage.getItem('step2Reason');
    const rentItem = localStorage.getItem('step1Item');
    const selectedTimeSlots = JSON.parse(localStorage.getItem('step2Time')) || [];

    if (name) {
        $('#nameCell').text(name);
    }
    if (loginID) {
        $('#idNumberCell').text(loginID);
    }
    if (contactPhone) {
        $('#contactPhoneCell').text(contactPhone);
    }
    if (selectedRentDate) {
        $('#rentDateCell').text(selectedRentDate);
    }
    if (rentReason) {
        $('#rentReasonCell').text(rentReason);
    }
    if (rentItem) {
        $('#rentItemCell').text(rentItem);
    }
    if (selectedTimeSlots.length > 0) {
        $('#timeSlotsCell').text(selectedTimeSlots.join(', '));
    }

    $('#confirmButton').click(function () {
        const selectedRentDate = $('#rentDateCell').text();
        const selectedTimeSlots = $('#timeSlotsCell').text().split(', ');
        const rentReason = $('#rentReasonCell').text();
        const submitTime = new Date().toISOString();
        saveRentInfo(selectedRentDate, selectedTimeSlots, rentReason, loginID, contactPhone, name, rentItem, submitTime);
    });

    const rentInfoKey = 'rentInfoList';
    function saveRentInfo(date, timeSlots, reason, idNumber, phone, name, item, submitTime) {
        const rentInfoList = JSON.parse(localStorage.getItem(rentInfoKey)) || [];
        const newRentInfo = {
            date: date,
            timeSlots: timeSlots,
            item: item, // 租借項目
            status: '尚未繳費', // 預設狀態
            id: idNumber,
            reason: reason,
            submitTime: submitTime // 送出時間
        };
        rentInfoList.push(newRentInfo);
        localStorage.setItem(rentInfoKey, JSON.stringify(rentInfoList));

        clearData(['step1Item', 'step2Date', 'step2Reason', 'step2Time', 'step2IDNumber']);
        window.location.href = '/payment?time=' + submitTime;
    }

    function clearData(keys) {
        keys.forEach(key => localStorage.removeItem(key));
    }
});



// payment
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const submitTimeParam = urlParams.get('time');
    const tableBody = $('#paymentTableBody');
    if (submitTimeParam) {
        const rentInfoKey = 'rentInfoList';
        const rentInfoList = JSON.parse(localStorage.getItem(rentInfoKey)) || [];
        const orderIndex = rentInfoList.findIndex(info => info.submitTime === submitTimeParam);
        if (orderIndex !== -1) {
            const order = rentInfoList[orderIndex];
            if (order.status === '尚未繳費' || order.status === '繳費逾期') {
                let totalPrice = 0;
                order.timeSlots.forEach(timeSlot => {
                    const row = `
                        <tr>
                            <td>${timeSlot}</td>
                            <td style="text-align: right;">$300</td>
                        </tr>
                    `;
                    tableBody.append(row);
                    totalPrice += 300;
                });

                const totalRow = `
                    <tr>
                        <td colspan="2" style="text-align: right;">共計 ${totalPrice} 圓整</td>
                    </tr>
                `;
                tableBody.append(totalRow);

                $('#paymentButton').click(function () {
                    // 更新訂單狀態為預約成功
                    rentInfoList[orderIndex].status = '預約成功';
                    localStorage.setItem(rentInfoKey, JSON.stringify(rentInfoList));
                    window.location.href = '/order/';
                });
            } else {
                const row = `
                    <tr>
                        <td colspan="2" style="text-align: center; font-weight: bold;">訂單已經繳費</td>
                    </tr>
                `;
                tableBody.append(row);
                $('#paymentButton').hide();
            }
        } else {
            const row = `
                <tr>
                    <td colspan="2" style="text-align: center; font-weight: bold;">找不到相應的訂單</td>
                </tr>
            `;
            tableBody.append(row);
            $('#paymentButton').hide();
        }
    } else {
        const row = `
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold;">缺少提交時間參數</td>
            </tr>
        `;
        tableBody.append(row);
        $('#paymentButton').hide();
    }
});

// register
$(document).ready(function () {
    const toastLiveExample = $('#liveToast');
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        const name = $('#name').val();
        const idNumber = $('#idNumber').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

        if (password !== confirmPassword) {
            $('notify-head').removeClass('text-bg-success');
            $('notify-head').addClass('text-bg-danger');
            $('#notify-body').text('密碼與確認密碼不符')
            toastBootstrap.show()
            setTimeout(function () {
                toastBootstrap.fadeOut();
            }, 5000);
            return;
        }

        const newUser = {
            name: name,
            idNumber: idNumber,
            email: email,
            phone: phone,
            password: password
        };

        let userData = JSON.parse(localStorage.getItem('userData')) || [];

        // 檢查是否已存在相同的 idNumber
        const existingUser = userData.find(user => user.idNumber === idNumber);
        if (existingUser) {
            $('notify-head').removeClass('text-bg-success');
            $('notify-head').addClass('text-bg-danger');
            $('#notify-body').text('該教師／學生證號已經註冊過，請使用不同的證號。')
            toastBootstrap.show()
            setTimeout(function () {
                toastBootstrap.fadeOut();
            }, 5000);
            return;
        }

        userData.push(newUser);
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('註冊成功');
        window.location.href = '/';
    });
});

// login
$(document).ready(function () {
    const toastLiveExample = $('#liveToast');
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);

    if (window.location.pathname === '/') {
        // 初始检查，如果loginID存在，则跳转到/step-0
        if (localStorage.getItem('loginID')) {
            window.location.href = '/step-0';
        }
    }
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        const idNumber = $('#idNumber').val();
        const password = $('#password').val();
        let userData = JSON.parse(localStorage.getItem('userData')) || [];

        if (!Array.isArray(userData)) {
            userData = [userData];
        }

        const user = userData.find(user => user.idNumber === idNumber && user.password === password);
        if (user) {
            alert('登入成功');
            saveData("loginID", user.idNumber);
            window.location.href = '/step-0';
        } else {
            toastBootstrap.show()
            setTimeout(function () {
                toastBootstrap.fadeOut();
            }, 5000);
            return;
        }

    });
});

// document.addEventListener('DOMContentLoaded', function () {
//     var calendarEl = document.getElementById('calendar');

//     // 預約事件資料（這應該從伺服器端取得）
//     var events = [
//         {
//             title: '已預約',
//             start: '2024-05-25',
//             end: '2024-05-25',
//             backgroundColor: 'red', // 用紅色標示已預約
//             rendering: 'background' // 使其不可選取
//         },
//         // 添加更多已預約事件
//     ];

//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         selectable: true,
//         events: events,
//         schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
//         select: function (info) {
//             var selectedDate = info.startStr;
//             var existingEvent = events.find(event => event.start === selectedDate);
//             if (existingEvent) {
//                 alert('該日期已被預約，請選擇其他日期。');
//                 calendar.unselect();
//             } else {
//                 // 使用者選取日期處理
//                 var formDateInput = document.getElementById('selectedDate');
//                 if (!formDateInput) {
//                     formDateInput = document.createElement('input');
//                     formDateInput.type = 'hidden';
//                     formDateInput.id = 'selectedDate';
//                     formDateInput.value = selectedDate;
//                     document.body.appendChild(formDateInput);
//                 } else {
//                     formDateInput.value = selectedDate;
//                 }
//                 alert('您選取的日期是：' + selectedDate);
//             }
//         },
//         locale: 'zh-TW'
//     });

//     calendar.render();

//     document.getElementById('submitBtn').addEventListener('click', function () {
//         var selectedDateInput = document.getElementById('selectedDate');
//         if (selectedDateInput) {
//             var selectedDate = selectedDateInput.value;
//             var name = document.getElementById('name').value;
//             var idNumber = document.getElementById('idNumber').value;
//             var phone = document.getElementById('phone').value;
//             var reason = document.getElementById('reason').value;

//             // 提交資料
//             console.log({
//                 name: name,
//                 idNumber: idNumber,
//                 phone: phone,
//                 selectedDate: selectedDate,
//                 reason: reason
//             });

//             // 可以在這裡發送 AJAX 請求到伺服器以保存預約資料

//             alert('您的預約已提交！');
//         } else {
//             alert('請先選取一個日期！');
//         }
//     });
// });