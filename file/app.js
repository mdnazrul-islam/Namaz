
    function updateTimeAndImage() {
      const timeDiv = document.getElementById("time");
      const greetingDiv = document.getElementById("greeting");
      const image = document.getElementById("image");

      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      // বাংলা সময় প্রদর্শন (১২ ঘণ্টা ফরম্যাট)
      let displayHours = hours % 12;
      if (displayHours === 0) displayHours = 12; // 0 টা মানে 12 টা
      const period = hours >= 12 ? "PM" : "AM"; // AM/PM

      // সময় প্রদর্শন (উদাহরণ: ১২:৩০:৪৫ PM) - আপনি চাইলে বাংলা অঙ্ক ব্যবহার করতে পারেন
      timeDiv.innerText = `${toBengaliNumerals(displayHours.toString().padStart(2, '0'))}:${toBengaliNumerals(minutes)}:${toBengaliNumerals(seconds)} ${period}`; // Use Bengali Numerals here too

      // সময় অনুযায়ী শুভেচ্ছা ও ছবি নির্বাচন
      const fullHour = now.getHours(); // ২৪ ঘণ্টা ফরম্যাট ব্যবহার করা হচ্ছে শর্তের জন্য
      let greetingText = '';
      let imageUrl = '';
      let altText = '';

      if (fullHour >= 4 && fullHour < 6) {
        greetingText = "It's Dawn";
        imageUrl = "file/vor.jpg"; // ভোর
        altText = "ভোরের ছবি";
      } else if (fullHour >= 6 && fullHour < 12) {
        greetingText = "It's Morning";
        imageUrl = "file/shokal.jpg"; // সকাল
        altText = "সকালের ছবি";
      } else if (fullHour >= 12 && fullHour < 15) {
        greetingText = "It's Noon";
        imageUrl = "file/dupur.jpg"; // দুপুর
        altText = "দুপুরের ছবি";
      } else if (fullHour >= 15 && fullHour < 18) {
        greetingText = "It's Afternoon";
        imageUrl = "file/bikel.jpg"; // বিকেল
        altText = "বিকেলের ছবি";
      } else if (fullHour >= 18 && fullHour < 20) {
        greetingText = "It's Evening";
        imageUrl = "file/shondha.jpg"; // সন্ধ্যা
        altText = "সন্ধ্যার ছবি";
      } else {
        // রাত (রাত ৮টা থেকে ভোর ৪টা)
        greetingText = "It's Night";
        imageUrl = "file/rat.jpg"; // রাত
        altText = "রাতের ছবি";
      }

      greetingDiv.innerText = greetingText;

      // ছবির সোর্স ও alt টেক্সট আপডেট করার আগে বর্তমান সোর্সের সাথে মিলিয়ে দেখা হচ্ছে
      // যাতে অপ্রয়োজনে ছবিটি বারবার লোড না হয় যদি ইমেজ একই থাকে
      if (image.getAttribute('src') !== imageUrl) {
        image.style.opacity = 0; // ছবি পরিবর্তনের আগে স্বচ্ছ করে দিন
        setTimeout(() => {
          image.src = imageUrl;
          image.alt = altText;
          image.style.opacity = 1; // নতুন ছবি লোড হওয়ার পর দৃশ্যমান করুন
        }, 500); // CSS ট্রানজিশনের সময়ের সাথে মিল রেখে বা একটু কম সময় দিন
      } else if (image.style.opacity == 0) {
         // যদি কোনো কারণে ইমেজ সোর্স একই থাকে কিন্তু অপাসিটি ০ হয়ে যায়
         image.style.opacity = 1;
      }
    }

    // প্রতি সেকেন্ডে সময় আপডেট করুন
    setInterval(updateTimeAndImage, 1000);

    // পেজ লোড হওয়ার সাথে সাথেই ফাংশনটি একবার কল করুন
    // updateTimeAndImage(); // Called after Bengali Numerals defined


    const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const BENGALI_MONTHS = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
    const BENGALI_DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

    let countdownInterval; // To store the interval ID for the countdown

    // Function to convert English digits to Bengali numerals
    function toBengaliNumerals(numberString) {
        if (typeof numberString !== 'string') {
            numberString = String(numberString);
        }
        // Ensure the input is treated as a string before replace
        return String(numberString).replace(/\d/g, digit => BENGALI_NUMERALS[parseInt(digit)]);
    }


    // Function to format time (HH:MM) to 12-hour format with AM/PM and Bengali numerals
    function formatTimeBn12Hour(timeString) {
        if (!timeString || typeof timeString !== 'string') return 'N/A';

        // Remove seconds and any extra info like (BST)
        const timePart = timeString.split(' ')[0];
        const [hours24Str, minutesStr] = timePart.split(':');

        if (!hours24Str || !minutesStr) return 'N/A';

        const hours24 = parseInt(hours24Str);
        const minutes = parseInt(minutesStr);

        // Determine AM/PM (Removed Bengali AM/PM for simplicity, standard is fine)
        const ampm = hours24 >= 12 ? '' : '';

        // Convert hours to 12-hour format
        let hours12 = hours24 % 12;
        hours12 = hours12 ? hours12 : 12; // Handle midnight (0 becomes 12)

        // Format with Bengali numerals
        const formattedHours = toBengaliNumerals(hours12);
        const formattedMinutes = toBengaliNumerals(String(minutes).padStart(2, '0')); // Ensure two digits for minutes

        return `${formattedHours}:${formattedMinutes} ${ampm}`; // Kept AM/PM standard
    }


    // Function to format date in Bengali
    function formatBengaliDate(date) {
        const day = toBengaliNumerals(date.getDate());
        const month = BENGALI_MONTHS[date.getMonth()];
        const year = toBengaliNumerals(date.getFullYear());
        const dayName = BENGALI_DAYS[date.getDay()];
        return `${dayName}, ${day} ${month}, ${year}`;
    }

    // Function to display today's prayer times in the boxes
    function displayTodaysTimes(todayData) {
        const timesContainer = document.getElementById('today-times');
        if (!todayData || !todayData.timings) {
            timesContainer.innerHTML = '<div class="loader">আজকের সময় পাওয়া যায়নি।</div>';
            return;
        }
        const timings = todayData.timings;

        // Define the times to display in boxes, NOW INCLUDING SAHRI AND IFTAR
        // Using 'Imsak' for Sahri end time and 'Maghrib' for Iftar time
        const timesToShow = [
            { label: 'সাহরী', key: 'Imsak' },   // Added Sahri
            { label: 'ফজর', key: 'Fajr' },
            { label: 'সূর্যোদয়', key: 'Sunrise' },
            { label: 'যোহর', key: 'Dhuhr' },
            { label: 'আসর', key: 'Asr' },
            { label: 'সূর্যাস্ত', key: 'Sunset' },
            { label: 'মাগরিব', key: 'Maghrib' },
            { label: 'ইফতার', key: 'Maghrib' },  // Added Iftar (same time as Maghrib)
            { label: 'ইশা', key: 'Isha' },
        ];

        timesContainer.innerHTML = timesToShow.map(item => `
            <div class="time-box">
                <span class="label">${item.label}</span>
                <span class="time bn-num">${formatTimeBn12Hour(timings[item.key])}</span>
            </div>
        `).join('');
    }

    // Function to display the monthly prayer times table
    function displayMonthlyTable(monthlyData, currentDay) {
        const tableBody = document.getElementById('prayer-table-body');
        if (!monthlyData || monthlyData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="10" class="loader">মাসিক সময়সূচি পাওয়া যায়নি।</td></tr>';
            return;
        }

        tableBody.innerHTML = monthlyData.map(dailyData => {
            const date = new Date(dailyData.date.timestamp * 1000); // API timestamp is usually in seconds
            const dayOfMonth = date.getDate();
            const formattedDate = `${toBengaliNumerals(dayOfMonth)}-${toBengaliNumerals(date.getMonth() + 1)}-${toBengaliNumerals(date.getFullYear())}`;
            const timings = dailyData.timings;
            const isToday = (dayOfMonth === currentDay);

            // Use the 12-hour format function for table times as well
            return `
                <tr class="${isToday ? 'highlight' : ''}">
                    <td class="bn-num">${formattedDate}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Fajr)}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Sunrise)}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Dhuhr)}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Asr)}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Sunset)}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Maghrib)}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Isha)}</td>
                    <td class="bn-num">${formatTimeBn12Hour(timings.Imsak)}</td> <!-- Sahri time -->
                    <td class="bn-num">${formatTimeBn12Hour(timings.Maghrib)}</td> <!-- Iftar time -->
                 </tr>
            `;
        }).join('');
    }

    // Function to update the countdown timer
    function updateCountdown(todayData) {
        clearInterval(countdownInterval); // Clear previous interval if any

        if (!todayData || !todayData.timings) {
            document.getElementById('countdown').innerText = 'সময় গণনা সম্ভব হচ্ছে না।';
            return;
        }

        const timings = todayData.timings;
        const now = new Date();

        // Define prayer times with their names (using Bengali names)
        // Sahri (Imsak) and Iftar (Maghrib) are not usually counted down *to* as prayer start times,
        // but Fajr, Dhuhr, Asr, Maghrib, Isha are. We will stick to these for countdown.
        const prayerTimes = [
            { name: 'ফজর', timeStr: timings.Fajr },
           // { name: 'সূর্যোদয়', timeStr: timings.Sunrise }, // Usually not counted down to
            { name: 'যোহর', timeStr: timings.Dhuhr },
            { name: 'আসর', timeStr: timings.Asr },
           // { name: 'সূর্যাস্ত', timeStr: timings.Sunset }, // Usually not counted down to
            { name: 'মাগরিব', timeStr: timings.Maghrib },
            { name: 'ইশা', timeStr: timings.Isha }
        ].map(p => {
            // Create Date objects for today's prayer times
            const [hours, minutes] = p.timeStr.split(' ')[0].split(':');
            const prayerDate = new Date(now);
            prayerDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            return { name: p.name, date: prayerDate };
        }).sort((a, b) => a.date - b.date); // Sort times chronologically


        let nextPrayer = null;
        // Find the first prayer time that is after the current time
        for (const prayer of prayerTimes) {
            if (prayer.date > now) {
                nextPrayer = prayer;
                break;
            }
        }

        // If all prayers for today are done, the next prayer is Fajr of the next day
        if (!nextPrayer) {
             const fajrTimeStr = timings.Fajr.split(' ')[0];
             const [hours, minutes] = fajrTimeStr.split(':');
             const nextFajrDate = new Date(now);
             nextFajrDate.setDate(now.getDate() + 1); // Move to tomorrow
             nextFajrDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
             nextPrayer = { name: 'ফজর', date: nextFajrDate };
        }


        function doCountdown() {
             const currentTime = new Date();
             const timeDifference = nextPrayer.date - currentTime;

             if (timeDifference <= 0) {
                 // Time has passed, reload data to find the *next* prayer
                 document.getElementById('countdown').innerText = `${nextPrayer.name} এর সময় হয়েছে।`;
                 clearInterval(countdownInterval);
                 // Optional: Reload data automatically after a short delay
                  setTimeout(loadPrayerTimes, 30000); // Reload after 30 seconds to get next time
                 return;
             }

             const totalSeconds = Math.floor(timeDifference / 1000);
             const hours = Math.floor(totalSeconds / 3600);
             const minutes = Math.floor((totalSeconds % 3600) / 60);
             const seconds = totalSeconds % 60;

             document.getElementById('countdown').innerHTML = `
                 পরবর্তী ওয়াক্ত <span> ${nextPrayer.name} </span> শুরু হতে বাকি: 
                 <span>${toBengaliNumerals(String(hours).padStart(2, '0'))}</span> ঘন্টা
                 <span>${toBengaliNumerals(String(minutes).padStart(2, '0'))}</span> মিনিট
                 <span>${toBengaliNumerals(String(seconds).padStart(2, '0'))}</span> সেকেন্ড
             `;
        }

        doCountdown(); // Run once immediately
        countdownInterval = setInterval(doCountdown, 1000); // Update every second
    }

    // Main function to load prayer times from API
    async function loadPrayerTimes() {
        // Clear existing countdown
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerText = 'গণনা লোড হচ্ছে...';

        // Show loaders
        document.getElementById('today-times').innerHTML = '<div class="loader">আজকের সময় লোড হচ্ছে...</div>';
        document.getElementById('prayer-table-body').innerHTML = '<tr><td colspan="10" class="loader">মাসিক সময়সূচি লোড হচ্ছে...</td></tr>';
        document.getElementById('date-info').innerHTML = '<span>তারিখ লোড হচ্ছে...</span>';
        document.getElementById('table-title').innerText = 'মাসিক সময়সূচি লোড হচ্ছে...';
        // Removed loader text for separate sehri/iftar divs
        // document.getElementById('sehri-summary').innerText = 'সেহরি: লোড হচ্ছে...';
        // document.getElementById('iftar-summary').innerText = 'ইফতার: লোড হচ্ছে...';


        const location = document.getElementById('location').value;
        const country = "Bangladesh"; // Assuming Bangladesh
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // JavaScript months are 0-indexed
        const day = now.getDate();

        // Using Aladhan API (Method 2 is ISNA, commonly used)
        // Note: Different methods might give slightly different times, especially for Fajr/Isha.
        // Method 4 (Umm al-Qura) or Method 3 (Muslim World League) are also common.
        // Method 99 uses custom Fajr/Isha angles if needed. Method 2 (ISNA) is a good default.
        const apiUrl = `https://api.aladhan.com/v1/calendarByCity?city=${location}&country=${country}&method=2&month=${month}&year=${year}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API অনুরোধ ব্যর্থ হয়েছে: ${response.statusText} (Status: ${response.status})`);
            }
            const data = await response.json();

            if (data.code === 200 && data.data && data.data.length > 0) {
                const monthlyData = data.data;
                // Find today's data based on the day of the month from the API response date
                const todayData = monthlyData.find(d => parseInt(d.date.gregorian.day) === day);


                if (todayData) {
                    // Display today's times (using 12hr format function) - Now includes Sahri/Iftar in the grid
                    displayTodaysTimes(todayData);

                    // Display current date
                    const currentDate = new Date(todayData.date.timestamp * 1000);
                    document.getElementById('date-info').innerHTML = `<span>${formatBengaliDate(currentDate)}</span>`;
                    document.getElementById('table-title').innerText = `${BENGALI_MONTHS[currentDate.getMonth()]} ${toBengaliNumerals(currentDate.getFullYear())} মাসের সময়সূচি (${location})`;

                    // Start countdown for the next *prayer* (Fajr, Dhuhr, Asr, Maghrib, Isha)
                    updateCountdown(todayData);

                } else {
                     // This might happen if the API returns data but not specifically for today's date number.
                     // Fallback to using the current system date for display, but show data missing message.
                     document.getElementById('today-times').innerHTML = `<div class="loader">আজ (${toBengaliNumerals(day)}) তারিখের ডেটা API ফলাফলে পাওয়া যায়নি।</div>`;
                     document.getElementById('countdown').innerText = 'আজকের ডেটা পাওয়া যায়নি।';
                     document.getElementById('date-info').innerHTML = `<span>${formatBengaliDate(now)} (API ডেটা নেই)</span>`;
                     // Still display the monthly table if available
                     displayMonthlyTable(monthlyData, day); // Pass day for highlighting attempt
                     document.getElementById('table-title').innerText = `${BENGALI_MONTHS[now.getMonth()]} ${toBengaliNumerals(now.getFullYear())} মাসের সময়সূচি (${location})`;
                }

                // Display monthly table (if not already displayed in the else block)
                 if (todayData) {
                    displayMonthlyTable(monthlyData, day);
                 }

            } else {
                 let errorMsg = 'API থেকে ডেটা পাওয়া যায়নি বা ফরম্যাট সঠিক নয়।';
                 if(data.status) errorMsg += ` (API Status: ${data.status})`;
                 if(data.data && typeof data.data === 'string') errorMsg += ` - ${data.data}`; // API might return string error message
                throw new Error(errorMsg);
            }

        } catch (error) {
            console.error("Error fetching prayer times:", error);
            // Display error messages
            document.getElementById('countdown').innerText = 'ত্রুটি: সময় লোড করা সম্ভব হয়নি।';
            document.getElementById('today-times').innerHTML = `<div class="loader">ত্রুটি: ${error.message}</div>`;
            document.getElementById('prayer-table-body').innerHTML = `<tr><td colspan="10" class="loader">ত্রুটি: ${error.message}</td></tr>`;
            document.getElementById('date-info').innerHTML = `<span>${formatBengaliDate(now)} (ত্রুটি)</span>`;
            document.getElementById('table-title').innerText = 'সময়সূচি লোড করতে সমস্যা হয়েছে';
            // Removed error text for separate sehri/iftar divs
        }
    }

    // Load times when the page loads
    document.addEventListener('DOMContentLoaded', () => {
         updateTimeAndImage(); // Call initial time update here after functions are defined
         loadPrayerTimes(); // Load prayer times
    });
    
    
    //আরবী তারিখ
    const hijriMonthsBn = [
      "মুহাররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", 
      "জুমাদাল উলা", "জুমাদাস সানি", "রজব", "শা'বান", 
      "রমজান", "শাওয়াল", "জিলক্বদ", "জিলহজ্জ"
    ];

    const engToBnDigits = (str) => str.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

    async function loadHijriDate() {
      try {
        const response = await fetch("https://api.aladhan.com/v1/gToH?adjustment=0");
        const data = await response.json();
        const hijri = data.data.hijri;

        const day = engToBnDigits(hijri.day);
        const monthIndex = hijri.month.number - 1;
        const monthName = hijriMonthsBn[monthIndex];
        const year = engToBnDigits(hijri.year);

        const hijriDate = `${day} ${monthName} ${year} `;
        document.getElementById("hijri-date").innerText = hijriDate;
      } catch (error) {
        document.getElementById("hijri-date").innerText = "হিজরী তারিখ লোড করা যায়নি।";
      }
    }

    loadHijriDate();
    
    //বাংলা তারিখ
      
    const banglaMonths = [
      "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
      "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
    ];

    const monthStartDates = [
      [14, 4],  [15, 5],  [15, 6],  [16, 7],  [17, 8],  [17, 9],
      [17, 10], [16, 11], [16, 12], [15, 1],  [14, 2],  [15, 3]
    ];

    const toBanglaNumber = (str) => str.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

    function getBanglaDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      let banglaYear = year - 593;
      let banglaMonth = 0;
      let banglaDay = 0;

      for (let i = 0; i < 12; i++) {
        const [startDay, startMonth] = monthStartDates[i];
        const nextMonth = (i === 11) ? 0 : i + 1;
        const [nextStartDay, nextStartMonth] = monthStartDates[nextMonth];

        const currentDate = new Date(year, month - 1, day);
        const startDate = new Date(year, startMonth - 1, startDay);
        const endDate = new Date(year, nextStartMonth - 1, nextStartDay);

        if ((currentDate >= startDate && currentDate < endDate) || (i === 11 && currentDate >= startDate)) {
          banglaMonth = i;
          banglaDay = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
          break;
        }
      }

      if (month < 4 || (month === 4 && day < 14)) {
        banglaYear -= 1;
      }

      return `${toBanglaNumber(banglaDay.toString())} ${banglaMonths[banglaMonth]} ${toBanglaNumber(banglaYear.toString())} `;
    }

    document.getElementById("bangla-date").innerText = getBanglaDate();
  