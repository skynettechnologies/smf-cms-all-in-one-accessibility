document.addEventListener('DOMContentLoaded', function () {
    const infoBlocks = document.querySelectorAll(".information.noup");
    const settingsList = document.querySelector("dl.settings");

    if (infoBlocks.length > 0 && settingsList) {
        // Create a flex wrapper for NOTE + Upgrade
        const wrapper = document.createElement("div");
        wrapper.classList.add("upgrade-container");

        // Move each info block into the wrapper
        infoBlocks.forEach(block => {
            wrapper.appendChild(block);
        });

        // Create dt/dd pair (SMF requirement)
        let dt = document.createElement("dt");
        dt.style.display = "none";

        let dd = document.createElement("dd");
        dd.classList.add("all-in-one-accessibility-note");
        dd.appendChild(wrapper);

        // Insert at the top of settings
        settingsList.prepend(dd);
        settingsList.prepend(dt);
    }

    function setWidgetData(widgetPosition, widgetColor, iconType, iconSize, widgetSize, widgetIconSizeCustom, is_widget_custom_size, is_widget_custom_position, widgetPositionTop, widgetPositionBottom, widgetPositionLeft, widgetPositionRight) {
        if (widgetColor) {
            const colorInput = document.querySelector('[name="color"]');
            if (colorInput) {
                colorInput.value = widgetColor;
            }
        }
        // Widget Position (predefined positions)
        if (widgetPosition) {
            const positionSelect = document.querySelector('[name="position"]');
            if (positionSelect) {
                positionSelect.value = widgetPosition;
            }
        }

        // Icon Type
        if (iconType) {
            document.querySelector('[name="icon_type"]').value = iconType;
            const iconImg = "https://www.skynettechnologies.com/sites/default/files/" + iconType + ".svg";
            document.querySelectorAll(".iconimg").forEach(img => img.src = iconImg);
        }
        // Fixed Icon Size
        if (iconSize) {
            document.querySelector('[name="icon_size"]').value = iconSize;
        }
        // Widget Size
        if (widgetSize) {
            document.querySelector('[name="widget_size"]').value = widgetSize;
        }

        // Custom Widget Icon Size
        if (widgetIconSizeCustom !== undefined && widgetIconSizeCustom !== "") {
            document.querySelector('[name="widget_icon_size_custom"]').value = widgetIconSizeCustom;
        }

        // Custom Size Mode
        if (is_widget_custom_size !== undefined) {
            const customSizeCheckbox = document.querySelector('input[name="is_widget_custom_size"]');
            if (customSizeCheckbox) {
                customSizeCheckbox.checked = String(is_widget_custom_size) === "1";
                if (typeof window._applyIconSizeVisibility === 'function') {
                    window._applyIconSizeVisibility();
                }
                customSizeCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        // Custom Position Mode
        if (is_widget_custom_position !== undefined) {
            const customPositionCheckbox = document.querySelector('input[name="is_widget_custom_position"]');
            if (customPositionCheckbox) {
                customPositionCheckbox.checked = String(is_widget_custom_position) === "1";
                if (typeof window._applyCustomPositionVisibility === 'function') {
                    window._applyCustomPositionVisibility();
                }
                customPositionCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        // Horizontal Position
        const horizInput = document.querySelector('[name="aioa_custom_position_horizontal"]');
        const horizTypeSelect = document.querySelector('[name="aioa_custom_position_horizontal_type"]');

        if (widgetPositionLeft) {
            horizInput.value = widgetPositionLeft;
            horizTypeSelect.value = "left";
        } else if (widgetPositionRight) {
            horizInput.value = widgetPositionRight;
            horizTypeSelect.value = "right";
        }

        // Vertical Position
        const vertInput = document.querySelector('[name="aioa_custom_position_vertical"]');
        const vertTypeSelect = document.querySelector('[name="aioa_custom_position_vertical_type"]');

        if (widgetPositionTop) {
            vertInput.value = widgetPositionTop;
            vertTypeSelect.value = "top";
        } else if (widgetPositionBottom) {
            vertInput.value = widgetPositionBottom;
            vertTypeSelect.value = "bottom";
        }

        // Now reapply visibility so correct fields are shown after setting
        if (typeof window._applyCustomPositionVisibility === 'function') {
            window._applyCustomPositionVisibility();
        }
    }
    const defaultValues = {
        widgetPosition: "bottom_right",
        widgetColor: "#420083",
        iconType: "aioa-icon-type-1",
        iconSize: "aioa-small-icon",
        widgetSize: "",
        widgetIconSizeCustom: "",
        is_widget_custom_size: "0",
        is_widget_custom_position: "0",
        widgetPositionTop: "",
        widgetPositionBottom: "",
        widgetPositionLeft: "",
        widgetPositionRight: ""
    };
    const domain_name = window.location.host; //window.location.host;
    if (domain_name && domain_name !== '') {
        // Show loader before fetching data
        // If domain_name is present, fetch from the external API
        const apiUrl = "https://ada.skynettechnologies.us/api/widget-settings";   // Fetch Widget Data from the Dashboard
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                website_url: domain_name
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then((data) => {
                // Extract widget position and other settings from the API response
                const widgetPosition = data.Data?.widget_position || defaultValues.widgetPosition;
                const widgetColor = data.Data?.widget_color_code || defaultValues.widgetColor;
                const iconType = data.Data?.widget_icon_type || defaultValues.iconType;
                const iconSize = data.Data?.widget_icon_size || defaultValues.iconSize;
                const widgetSize = data.Data?.widget_size || defaultValues.widgetSize;
                const widgetIconSizeCustom = data.Data?.widget_icon_size_custom || defaultValues.widgetIconSizeCustom;
                const is_widget_custom_size = data.Data?.is_widget_custom_size || defaultValues.is_widget_custom_size;
                const is_widget_custom_position = data.Data?.is_widget_custom_position || defaultValues.is_widget_custom_position;
                const widgetPositionTop = data.Data?.widget_position_top ?? defaultValues.widgetPositionTop;
                const widgetPositionBottom = data.Data?.widget_position_bottom ?? defaultValues.widgetPositionBottom;
                const widgetPositionLeft = data.Data?.widget_position_left ?? defaultValues.widgetPositionLeft;
                const widgetPositionRight = data.Data?.widget_position_right ?? defaultValues.widgetPositionRight;
                setWidgetData(
                    widgetPosition,
                    widgetColor,
                    iconType,
                    iconSize,
                    widgetSize,
                    widgetIconSizeCustom,
                    is_widget_custom_size,
                    is_widget_custom_position,
                    widgetPositionTop,
                    widgetPositionBottom,
                    widgetPositionLeft,
                    widgetPositionRight
                );
            })
            .catch((error) => {
                console.log("Error fetching widget position:", error);
            })
            .finally(() => {
                // Hide loader after fetching data is complete (success or error)
                // hideLoader();
            });
    }
    else {
        // If domain_name is not valid, set default values
        setWidgetData(
            defaultValues.widgetPosition,
            defaultValues.widgetColor,
            defaultValues.iconType,
            defaultValues.iconSize,
            defaultValues.widgetSize,
            defaultValues.widgetIconSizeCustom,
            defaultValues.is_widget_custom_size,
            defaultValues.is_widget_custom_position,
            defaultValues.widgetPositionTop,
            defaultValues.widgetPositionBottom,
            defaultValues.widgetPositionLeft,
            defaultValues.widgetPositionRight
        );
    }
    $('.colorpicker').on('input', function () {
        $('.colorint').val(this.value);
    });
    $('.colorint').on('input', function () {
        $('.colorpicker').val(this.value);
    });

    $(".icon_type").change(function () {
        var icon_type = $(this).val(); // Get the selected icon type value
        var iconImg = "https://www.skynettechnologies.com/sites/default/files/" + icon_type + ".svg";
        $(".iconimg").attr("src", iconImg); // Update the icon image source
    });

    // Global submit listener — works even if form loads later
    document.addEventListener('submit', function (e) {
        console.log("✅ Submit event triggered");
        e.preventDefault();

        var color = document.querySelector('[name="color"]')?.value || '';
        var positionVal = document.querySelector('[name="position"]')?.value || '';
        var icon_typeVal = document.querySelector('[name="icon_type"]')?.value || '';
        var icon_sizeVal = document.querySelector('[name="icon_size"]')?.value || '';
        var custom_position_horizontal = document.querySelector('[name="aioa_custom_position_horizontal"]')?.value || '';
        var custom_position_vertical = document.querySelector('[name="aioa_custom_position_vertical"]')?.value || '';
        var custom_position_horizontal_type = document.querySelector('select[name="aioa_custom_position_horizontal_type"]')?.value || '';
        var custom_position_vertical_type = document.querySelector('select[name="aioa_custom_position_vertical_type"]')?.value || '';
        var widget_size = document.querySelector('[name="widget_size"]')?.value || '';

        var widget_position_left = (custom_position_horizontal_type === "left") ? custom_position_horizontal : "";
        var widget_position_right = (custom_position_horizontal_type === "right") ? custom_position_horizontal : "";
        var widget_position_top = (custom_position_vertical_type === "top") ? custom_position_vertical : "";
        var widget_position_bottom = (custom_position_vertical_type === "bottom") ? custom_position_vertical : "";

        var is_widget_custom_position = document.querySelector('[name="is_widget_custom_position"]')?.checked ? '1' : '0';
        var is_widget_custom_size = document.querySelector('[name="is_widget_custom_size"]')?.checked ? '1' : '0';

        var widget_icon_size_custom = document.querySelector('[name="widget_icon_size_custom"]')?.value || '';
        console.log("Custom Pos:", is_widget_custom_position, "Custom Size:", is_widget_custom_size);

        const customSize = parseInt(widget_icon_size_custom, 10);
        if (isNaN(customSize) || customSize < 20 || customSize > 150) {
            alert("The icon size must be between 20 and 150px.");
            return;
        }
        // 🔹 Horizontal position validation
        const horizontalPos = parseInt(custom_position_horizontal, 10);
        if (isNaN(horizontalPos) || horizontalPos < 0 || horizontalPos > 250) {
            alert("The horizontal position must be between 0 and 250px.");
            return; // Stop saving
        }
        // 🔹 Vertical position validation
        const verticalPos = parseInt(custom_position_vertical, 10);
        if (isNaN(verticalPos) || verticalPos < 0 || verticalPos > 250) {
            alert("The vertical position must be between 0 and 250px.");
            return; // Stop saving
        }
        console.log("Vertical:", verticalPos, "Horizontal:", horizontalPos);
        // 🔹 If validation passes, then proceed with fetch
        var params = new URLSearchParams();
        params.append('u', domain_name);
        params.append('widget_position', positionVal);
        params.append('widget_color_code', color);
        params.append('widget_icon_type', icon_typeVal);
        params.append('widget_icon_size', icon_sizeVal);
        params.append('widget_position_left', widget_position_left);
        params.append('widget_position_top', widget_position_top);
        params.append('widget_position_right', widget_position_right);
        params.append('widget_position_bottom', widget_position_bottom);
        params.append('widget_size', widget_size);
        params.append('is_widget_custom_position', is_widget_custom_position);
        params.append('is_widget_custom_size', is_widget_custom_size);
        params.append('widget_icon_size_custom', widget_icon_size_custom);

        const requestOptions = {
            method: "POST",
            body: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            redirect: "follow"
        };

        let requestSucceeded = false;

        fetch('https://ada.skynettechnologies.us/api/widget-setting-update-platform', requestOptions)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(result => {
                if (result && typeof result.msg === 'string' && result.msg.toLowerCase().includes('successfully')) {
                    requestSucceeded = true;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                if (requestSucceeded) {
                    alert("Widget Settings saved successfully!!!");
                } else {
                    alert("Something went wrong while saving the widget settings.");
                }
            });
    });

    // Return the <dt>/<dd> pair for a control inside an SMF admin <dl>
    function findPair(el) {
        if (!el) return null;
        const dd = el.closest('dd') || el.parentElement?.closest('dd');
        if (!dd) return null;
        const dt = dd.previousElementSibling && dd.previousElementSibling.tagName.toLowerCase() === 'dt'
            ? dd.previousElementSibling
            : null;
        return dt && dd ? { dt, dd } : null;
    }

    function showPair(pair, show = true) {
        if (!pair) return;
        pair.dt.style.display = show ? '' : 'none';
        pair.dd.style.display = show ? '' : 'none';
    }

    /* ---- Custom POSITION toggler ---- */
    function initPositionToggler() {
        // Names must match your form fields
        const selectCustomPos = document.querySelector('input[name="is_widget_custom_position"]');
        const regularPosEl    = document.querySelector('[name="position"]');
        const horizEl         = document.querySelector('[name="aioa_custom_position_horizontal"]');
        const horizTypeEl     = document.querySelector('[name="aioa_custom_position_horizontal_type"]');
        const vertEl          = document.querySelector('[name="aioa_custom_position_vertical"]');
        const vertTypeEl      = document.querySelector('[name="aioa_custom_position_vertical_type"]');

        if (!selectCustomPos) return false;

        const regularPosPair = findPair(regularPosEl);
        const horizPair      = findPair(horizEl);
        const horizTypePair  = findPair(horizTypeEl);
        const vertPair       = findPair(vertEl);
        const vertTypePair   = findPair(vertTypeEl);

        // Ensure we have all required pairs
        if (!regularPosPair || !horizPair || !horizTypePair || !vertPair || !vertTypePair) return false;

        function apply() {
            const custom = !!selectCustomPos.checked;
            showPair(regularPosPair, !custom);
            showPair(horizPair,      custom);
            showPair(horizTypePair,  custom);
            showPair(vertPair,       custom);
            showPair(vertTypePair,   custom);
        }

        apply();
        selectCustomPos.addEventListener('change', apply);
        // Expose for debugging if you want to call it from console
        window._applyCustomPositionVisibility = apply;
        return true;
    }

// Retry until SMF renders the settings
    (function waitForPositionFields() {
        if (!initPositionToggler()) setTimeout(waitForPositionFields, 200);
    })();

    /* ---- ICON SIZE toggler ---- */
    function initSizeToggler() {
        const select   = document.querySelector('input[name="is_widget_custom_size"]');
        const fixedEl  = document.querySelector('[name="icon_size"]');
        const customEl = document.querySelector('[name="widget_icon_size_custom"]');

        if (!select) return false;

        const fixedPair  = findPair(fixedEl);
        const customPair = findPair(customEl);

        if (!fixedPair || !customPair) return false;

        function apply() {
            const custom = !!select.checked;
            showPair(fixedPair,  !custom);
            showPair(customPair,  custom);
        }

        apply();
        select.addEventListener('change', apply);
        window._applyIconSizeVisibility = apply;
        return true;
    }

    (function waitForSizeFields() {
        if (!initSizeToggler()) setTimeout(waitForSizeFields, 200);
    })();

});
