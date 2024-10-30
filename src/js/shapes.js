/**
 * Shapes Extension for JSS
 *
 * Website: https://jspreasheet.com
 * Description: Create amazing web based spreadsheets.
 */

if (!lemonade && typeof(require) === 'function') {
    var lemonade = require('lemonadejs');
}

if (!studio && typeof(require) === 'function') {
    var studio = require('@lemonadejs/studio');
}

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.shapes = factory();
}(this, (function() {
    // Jspreadsheet helper
    let JSS = null;

    // Translations
    const T = function(t, s) {
        // Translate texts
        if (document.dictionary) {
            t = document.dictionary[t] || t;
        }
        // String
        if (s && s.length) {
            for (let i = 0; i < s.length; i++) {
                t = t.replace('{'+i+'}', s[i]);
            }
        }
        return t;
    }

    const focus = function(el) {
        if (el.innerText.length) {
            let range = document.createRange();
            let sel = window.getSelection();
            let node = el.childNodes[el.childNodes.length-1];
            range.setStart(node, node.length)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
            el.scrollLeft = el.scrollWidth;
        }
    }

    const getActiveElement = function() {
        let a = document.activeElement;
        while (a && a.shadowRoot && a.shadowRoot.activeElement) {
            a = a.shadowRoot.activeElement;
        }
        return a;
    }

    const guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const drawRect = function(width, height) {
        return `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} L 0 0 z`;
    }

    const roundedRect = function(width, height) {
        let startOfTheCurve = 40;

        const smallestDimension = Math.min(width, height);
        if (startOfTheCurve > smallestDimension * 0.3) {
            startOfTheCurve = smallestDimension * 0.3;
        }

        return `M ${startOfTheCurve} 0 L ${width - startOfTheCurve} 0 Q ${width} 0 ${width} ${startOfTheCurve} L ${width} ${height - startOfTheCurve} Q ${width} ${height} ${width - startOfTheCurve} ${height} L ${startOfTheCurve} ${height} Q 0 ${height} 0 ${height - startOfTheCurve} L 0 ${startOfTheCurve} Q 0 0 ${startOfTheCurve} 0 z`;
    }

    const drawTriangle = function(width, height) {
        const halfTheWidth = width / 2;

        return `M ${halfTheWidth} 0 L ${width} ${height} L 0 ${height} L ${halfTheWidth} 0 z`;
    }

    const drawEllipse = function(width, height) {
        const halfTheWidth = width / 2;

        const scale = height / width;

        return `M ${halfTheWidth} 0 A 1 ${scale} 0 0 1 ${halfTheWidth},${height} A 1 ${scale} 0 0 1 ${halfTheWidth},${0} z`;
    }

    const rightTriangle = function(width, height) {
        return `M 0 0 L ${width} ${height} L 0 ${height} L 0 0 z`;
    }

    const drawDiamond = function(width, height) {
        const halfTheWidth = width / 2;
        const halfTheHeight = height / 2;

        return `M ${halfTheWidth} 0 L ${width} ${halfTheHeight} L ${halfTheWidth} ${height} L 0 ${halfTheHeight} L ${halfTheWidth} 0 z`;
    }

    const drawTrapezium = function(width, height) {
        let offset = 60;

        if (offset > width / 6) {
            offset = width / 6;
        }

        return `M ${offset} 0 L ${width - offset} 0 L ${width} ${height} L ${0} ${height} L ${offset} 0 z`;
    }

    const drawPentagon = function(width, height) {
        const halfTheWidth = width / 2;

        const offsetY = height * 0.35;
        const offsetX = width * 0.15

        return `M ${halfTheWidth} 0 L ${width} ${offsetY} L ${width - offsetX} ${height} L ${offsetX} ${height} L 0 ${offsetY} L ${halfTheWidth} 0 z`;
    }

    const drawParallelogram = function(width, height) {
        let offsetX = 30;

        const smallestDimension = Math.min(width, height);
        if (offsetX > smallestDimension * 0.3) {
            offsetX = smallestDimension * 0.3;
        }

        return `M ${offsetX} 0 L ${width} 0 L ${width - offsetX} ${height} L 0 ${height} L ${offsetX} 0 z`;
    }

    const drawHexagon = function(width, height) {
        let offsetX = 70;
        if (offsetX > height / 6) {
            offsetX = height / 6;
        }

        const halfTheHeight = height / 2;

        return `M ${offsetX} 0 L ${width - offsetX} 0 L ${width} ${halfTheHeight} L ${width - offsetX} ${height} L ${offsetX} ${height} L 0 ${halfTheHeight} L ${offsetX} 0 z`;
    }

    const drawHeptagon = function(width, height) {
        const halfTheWidth = width / 2;

        const offsetX1 = width * 0.1;
        const offsetY1 = height * 0.2;

        const offsetX2 = width * 0.25;

        const offsetY2 = height * 0.35;

        return `M ${halfTheWidth} 0 L ${width - offsetX1} ${offsetY1} L ${width} ${height - offsetY2} L ${width - offsetX2} ${height} L ${offsetX2} ${height} L 0 ${height - offsetY2} L ${offsetX1} ${offsetY1} L ${halfTheWidth} 0 z`;
    }

    const drawOctagon = function(width, height) {
        let offset = width * 0.30;

        if (offset > height * 0.30) {
            offset = height * 0.30;
        }

        return `M ${offset} 0 L ${width - offset} 0 L ${width} ${offset} L ${width} ${height - offset} L ${width - offset} ${height} L ${offset} ${height} L 0 ${height - offset} L 0 ${offset} L ${offset} 0 z`;
    }

    const drawDecagon = function(width, height) {
        const halfTheHeight = height / 2;

        const offsetX1 = width * 0.1;
        const offsetX2 = width * 0.33;

        const offsetY = height * 0.2;

        return `M ${offsetX2} 0 L ${width - offsetX2} 0 L ${width - offsetX1} ${offsetY} L ${width} ${halfTheHeight} L ${width - offsetX1} ${height - offsetY} L ${width - offsetX2} ${height} L ${offsetX2} ${height} L ${offsetX1} ${height - offsetY} L 0 ${halfTheHeight} L ${offsetX1} ${offsetY} L ${offsetX2} 0 z`;
    }

    const drawShapeMap = {
        rectangle: {
            draw: drawRect,
            textSettings: {
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
            },
        },
        'rounded-rectangle': {
            draw: roundedRect,
            textSettings: {
                top: '4%',
                left: '4%',
                height: '92%',
                width: '92%',
            },
        },
        triangle: {
            draw: drawTriangle,
            textSettings: {
                top: '50%',
                left: '25%',
                height: '50%',
                width: '50%',
            },
        },
        'right-triangle': {
            draw: rightTriangle,
            textSettings: {
                top: '50%',
                left: 0,
                height: '50%',
                width: '50%',
            },
        },
        ellipse: {
            draw: drawEllipse,
            textSettings: {
                top: '15%',
                left: '15%',
                height: '70%',
                width: '70%',
            },
        },
        diamond: {
            draw: drawDiamond,
            textSettings: {
                top: '26%',
                left: '26%',
                height: '48%',
                width: '48%',
            },
        },
        trapezium: {
            draw: drawTrapezium,
            textSettings: {
                top: 0,
                left: '18%',
                height: '100%',
                width: '64%',
            },
        },
        pentagon: {
            draw: drawPentagon,
            textSettings: {
                top: '23%',
                left: '18%',
                height: '77%',
                width: '64%',
            },
        },
        parallelogram: {
            draw: drawParallelogram,
            textSettings: {
                top: 0,
                left: 0,
                height: '100%',
                width: '-webkit-fill-available',
                marginLeft: '30px',
                marginRight: '30px',
            },
        },
        hexagon: {
            draw: drawHexagon,
            textSettings: {
                top: 0,
                left: 0,
                height: '100%',
                width: '-webkit-fill-available',
                marginLeft: '70px',
                marginRight: '70px',
            },
        },
        heptagon: {
            draw: drawHeptagon,
            textSettings: {
                top: '20%',
                left: '25%',
                height: '80%',
                width: '50%',
            },
        },
        octagon: {
            draw: drawOctagon,
            textSettings: {
                top: 0,
                left: '30%',
                height: '100%',
                width: '40%',
            },
        },
        decagon: {
            draw: drawDecagon,
            textSettings: {
                top: '20%',
                left: '10%',
                height: '60%',
                width: '80%',
            },
        },
    }

    const defaultBackgroundColor = '#cccccc';
    const defaultBorderColor = '#ff0000';

    const setBorder = function(media, { borderWidth = 1, borderColor = defaultBorderColor }) {
        const path = media.querySelector(':scope > svg > path');

        path.setAttribute('stroke-width', borderWidth);
        path.setAttribute('stroke', borderColor);
    }

    const setBackgroundColor = function(media, backgroundColor = defaultBackgroundColor) {
        const path = media.querySelector(':scope > svg > path');

        path.setAttribute('fill', backgroundColor);
    }

    const setText = function(media, text) {
        const d = media.querySelector(':scope > .shape-text');
        d.textContent = text;
    }

    const setShape = function(media, worksheet) {
        const mediaOptions = worksheet.options.media.find(function(record) {
            return record.id === media.id;
        });

        const style = media.style;

        const width = parseInt(style.width);
        const height = parseInt(style.height);

        const svg = media.querySelector(':scope > svg');

        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

        const path = svg.querySelector(':scope > path');

        const d = drawShapeMap[mediaOptions.options.type].draw(width, height);

        path.setAttribute('d', d);
    }

    const openEdition = function(textElement) {
        let activeElement = getActiveElement();
        if (activeElement !== textElement) {
            textElement.style.pointerEvents = 'auto';
            textElement.contentEditable = true;
            textElement.innerHTML = `<div>${textElement.innerHTML}</div>`;
            textElement.firstChild.focus();
            focus(textElement.firstChild);
        }
    }

    const closeEdition = function(textElement) {
        // Get the HTML content
        let htmlContent = textElement.innerHTML;
        // Replace <br> tags and end tags of block elements with \n
        htmlContent = htmlContent.replace(/<br\s*\/?>/gi, '\r\n'); // Replace <br> and <br/> with \n
        htmlContent = htmlContent.replace(/<\/(p|div|h[1-6]|li)>\s*/gi, '\n'); // Replace end tags of block elements with \n
        // Close edition
        textElement.style.pointerEvents = '';
        textElement.contentEditable = false;
        // Remove remaining HTML tags (if any)
        return htmlContent.replace(/<[^>]+>/g, '');
    }

    const createShape = function(instance, record, container) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('jss-shape');

        const style = svg.style;

        style.height = '100%';
        style.width = '100%';

        svg.innerHTML = '<path style="pointer-events: visible;" />';

        container.appendChild(svg);

        setShape(container, instance);

        const textElement = document.createElement('div');
        textElement.classList.add('jss_object', 'shape-text');
        const textElementStyle = textElement.style;
        const textSettings = drawShapeMap[record.options.type].textSettings;
        Object.entries(textSettings).forEach(function([property, value]) {
            textElementStyle[property] = value;
        });

        container.appendChild(textElement);

        container.addEventListener('keydown', function(e) {
            if ((e.key.length === 1 || e.key === 'Process') && !(e.altKey || e.ctrlKey)) {
                openEdition(textElement);
            }
        });

        container.addEventListener('dblclick', function() {
            openEdition(textElement);
        });

        textElement.addEventListener('blur', function() {
            let textContent = closeEdition(textElement);
            instance.setMedia([{
                id: container.id,
                options: { ...record.options, text: textContent.trim() }
            }]);
        })
    }

    const createMedia = function(worksheet, record) {
        let container = record.el;

        // Only add specific shapes controllers on the first event calling
        if (typeof(record.el.edit) === 'undefined') {
            container.style.backgroundColor = 'unset';
            container.style.pointerEvents = 'none';

            const mediaRefresh = container.refresh;

            const refresh = function (element, notPersist) {
                setShape(element, worksheet);

                mediaRefresh(notPersist);
            }

            container.refresh = refresh.bind(worksheet, container);

            container.edit = function (event) {
                if (worksheet.isEditable()) {
                    worksheet.parent.plugins.shapes.edit.open(worksheet, record);

                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }

            createShape(worksheet, record, container);
        }

        setBorder(container, {
            borderColor: record.options.borderColor,
            borderWidth: record.options.borderWidth,
        });

        setBackgroundColor(container, record.options.backgroundColor);
        setText(container, record.options.text);
    }

    /**
     * Add new chart lemonade component
     */
    const InsertShape = function() {
        let self = this;

        const iconSize = 24;

        self.instance = null;

        self.insert = function(e, s) {
            let options = {
                id: guid(),
                type: 'shape',
                width: 400,
                height: 300,
                options: {
                    type: s.id,
                }
            }
            self.instance.setMedia(options);
            // Close the modal
            self.modal.close();
        }

        self.shapes = Object.entries(drawShapeMap).map(function([id, properties]) {
            return {
                name: id.replace(/-/g, ' '),
                id: id,
                d: properties.draw(iconSize, iconSize),
            };
        });

        return `<Modal title="${T("Insert Shape")}" :ref="self.modal" :closable="true" :draggable="true" :width="320" :height="380" :closed="true" icon="interests">
            <div :loop="self.parent.shapes" class="shape-types jss_style_p20">
                <button style="cursor: pointer" title="{{self.name}}" onclick="self.parent.parent.insert">
                    <svg class="jss-shape" height="${iconSize}" width="${iconSize}">
                        <path d="{{self.d}}" stroke-width="1" stroke="black" fill="none">
                    </svg>
                </button>
            </div>
        </Modal>`;
    }

    const getFilledShapeOptions = function(options) {
        if (! options.backgroundColor) {
            options.backgroundColor = defaultBackgroundColor;
        }
        if (! options.borderColor) {
            options.borderColor = defaultBorderColor;
        }
        if (! options.borderWidth) {
            options.borderWidth = 1;
        }
    }

    const EditShape = function() {
        let self = this;

        self.borderWidthOptions = [
            { text: 0, value: 0 },
            { text: 1, value: 1 },
            { text: 3, value: 3 },
            { text: 4, value: 4 },
            { text: 5, value: 5 },
            { text: 6, value: 6 },
            { text: 7, value: 7 },
            { text: 8, value: 8 },
        ];

        self.open = function(worksheet, media) {
            getFilledShapeOptions(media.options);

            self.worksheet = worksheet;
            self.media = media;

            self.backgroundColor = media.options.backgroundColor;
            self.borderColor = media.options.borderColor;
            self.borderWidth = media.options.borderWidth;

            self.mustSave = null;
            self.modal.open();
        }

        self.save = function() {
            self.mustSave = true;
            self.modal.close();
        }

        self.cancel = function() {
            self.mustSave = false;
            self.modal.close();
        }

        self.onclose = function() {
            if (self.mustSave) {
                self.worksheet.setMedia([{
                    id: self.media.id,
                    options: {
                        type: self.media.options.type,
                        backgroundColor: self.backgroundColor,
                        borderColor: self.borderColor,
                        borderWidth: self.borderWidth,
                        text: self.media.options.text || '',
                    },
                }]);
            } else {
                const options = self.media.options;

                setBorder(self.media.el, {
                    borderColor: options.borderColor,
                    borderWidth: options.borderWidth,
                });

                setBackgroundColor(self.media.el, options.backgroundColor);
            }
        }

        self.onchange = function(property) {
            if (self.media) {
                if (property === 'backgroundColor') {
                    setBackgroundColor(self.media.el, self.backgroundColor);
                } else if (property === 'borderColor' || property === 'borderWidth') {
                    setBorder(self.media.el, {
                        borderColor: self.borderColor,
                        borderWidth: self.borderWidth,
                    });
                }
            }
        }

        self.onload = function() {
            self.modal = studio.Modal(self.el, {
                title: T("Shape Settings"),
                closed: true,
                width: 380,
                height: 280,
                icon: 'interests',
                backdrop: false,
                draggable: true,
                closable: true,
                onclose: self.onclose,
            });
        }

        return `<div>
            <div class="jss_style_p20">
                <div class="jss_style_row">
                    <div class="jss_style_col jss_style_f1">
                        <div class="jss_style_form_group" style="padding-right: 0">
                            <label>${T("Background Color")}</label>
                            <input type="text" :bind="self.backgroundColor" :ref="self.inputBackgroundColor" class="jss_object" /> <Color :input="self.inputBackgroundColor" :bind="self.backgroundColor" />
                        </div>
                    </div>
                </div>
                <div class="jss_style_row">
                    <div class="jss_style_col jss_style_f1">
                        <div class="jss_style_form_group">
                            <label>${T("Border Color")}</label>
                            <input type="text" :bind="self.borderColor" :ref="self.inputBorderColor" class="jss_object" /> <Color :input="self.inputBorderColor" :bind="self.borderColor" />
                        </div>
                    </div>
                    <div class="jss_style_col">
                        <div class="jss_style_form_group" style="padding-right: 0">
                            <label>${T("Border Width")}</label>
                            <Dropdown :data="self.borderWidthOptions" :bind="self.borderWidth" :width="120" />
                        </div>
                    </div>
                </div>
                <br>
                <div class='jss_style_row'>
                    <button type="button" class="jss_style_button" onclick="self.save" style="width: 48%">${T("Save")}</button>
                    <button type="button" class="jss_style_button" onclick="self.cancel" style="width: 48%">${T("Cancel")}</button>
                </div>
            </div>
        </div>`;
    }

    const pluginShape = function(spreadsheet) {
        let self = {};

        self.init = function(worksheet) {
            const media = worksheet.options.media;
            if (media) {
                media.forEach(function(record) {
                    if (record.type === 'shape') {
                        createMedia(worksheet, record);
                    }
                })
            }
        }

        self.onevent = function(event, worksheet, a, b, c) {
            if (event === 'onchangemedia') {
                let newValue = a;
                let affectedRecords = c;
                for (let index = 0; index < newValue.length; index++) {
                    if (affectedRecords[index].type === 'shape') {
                        // Make sure all shape controls are bound
                        createMedia(worksheet, affectedRecords[index]);
                    }
                }
            }
        }

        self.open = function(instance) {
            self.insert.instance = instance;
            // Open the modal
            self.insert.modal.open();
        }

        self.toolbar = function(toolbar) {
            toolbar.items.push({
                content: "interests",
                type: "i",
                tooltip: T("Insert shape"),
                onclick: function() {
                    self.open(JSS.current);
                },
                updateState: function(a,b,c,d) {
                    // Readonly items
                    if (d.isEditable()) {
                        c.classList.remove('jtoolbar-disabled');
                    } else {
                        c.classList.add('jtoolbar-disabled');
                    }
                }
            });

            return toolbar;
        }

        const ComponentPlugin = function() {
            let template = `<div>
                <div><InsertShape :ref="self.insert" /></div>
                <div><EditShape :ref="self.edit" /></div>
            </div>`;

            return lemonade.element(template, self, { InsertShape: InsertShape, EditShape: EditShape });
        }

        // Create the modal container
        let container = document.createElement("div");
        spreadsheet.tools.append(container);

        // Create the lemonade plugin
        lemonade.render(ComponentPlugin, container);

        return self;
    }

    /**
     * Create a plugin object
     * @param {object} spreadsheet object.
     * @param {object} plugin options
     */
    const P = (function() {
        return true;
    });

    /**
     * on create spreadsheet
     * @param {type} spreadsheet
     * @param {type} options
     * @returns {undefined}
     */
    P.oninit = function(spreadsheet, options) {
        spreadsheet.setPlugins({
            shapes: pluginShape
        });
    }

    P.license = function(v) {
        // Jspreadsheet binding
        if (JSS === null) {
            JSS = this;
        }
    }

    return P;
})));